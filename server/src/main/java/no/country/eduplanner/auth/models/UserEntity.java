package no.country.eduplanner.auth.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity {

    public static final int MAX_FAILED_ATTEMPTS = 5;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    private String password;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "firstName", column = @Column(name = "profile_first_name")),
            @AttributeOverride(name = "lastName", column = @Column(name = "profile_last_name")),
    })
    @Setter
    private Profile profileInfo;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role", nullable = false)
    private Set<UserRole> roles = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "account_status")
    @Builder.Default
    private AccountStatus status = AccountStatus.UNVERIFIED;

    @Column(name = "failed_logins")
    @Builder.Default
    private int failedLoginAttemptsCount = 0;

    @Column(name = "last_login_date")
    private LocalDateTime lastLoginDate;

    @Setter
    @Column(name = "verification_token")
    private String verificationToken;

    @Setter
    @Column(name = "token_expiration")
    private LocalDateTime tokenExpiration;

    @Setter
    @Column(name = "unlock_token")
    private String unlockToken;

    @Setter
    @Column(name = "unlock_token_expiration")
    private LocalDateTime unlockTokenExpiration;

    public void incrementFailedAttemptsCount() {
        this.failedLoginAttemptsCount++;
        log.info("🔐 Recorded failed login attempt for user [{}]. Current count: [{}]", this.email, this.failedLoginAttemptsCount);
        if (this.failedLoginAttemptsCount >= MAX_FAILED_ATTEMPTS) {
            lockAccount();
            log.info("🔐 Locked user [{}] after [{}] failed login attempts", this.email, this.failedLoginAttemptsCount);
        }
    }

    public void resetFailedAttempts() {
        this.failedLoginAttemptsCount = 0;
    }

    public void recordSuccessfulLogin() {
        this.lastLoginDate = LocalDateTime.now();
        this.resetFailedAttempts();
    }

    public boolean isTokenExpired() {
        return tokenExpiration != null && tokenExpiration.isBefore(LocalDateTime.now());
    }

    public void activateAccount() {
        log.info("🔐 Activated account for user [{}]", this.email);
        this.status = AccountStatus.ACTIVE;
        this.verificationToken = null;
        this.tokenExpiration = null;
    }
    public void disableAccount() {
        log.info("🔐 Disabled account for user [{}]", this.email);
        this.status = AccountStatus.DISABLED;
    }

    public void lockAccount() {
        log.info("🔐 Locked account for user [{}]", this.email);
        this.status = AccountStatus.LOCKED;
        this.unlockToken = UUID.randomUUID().toString();
        this.unlockTokenExpiration = LocalDateTime.now().plusHours(24);
    }

    public boolean isUnlockTokenValid() {
        return unlockTokenExpiration != null && unlockTokenExpiration.isAfter(LocalDateTime.now());
    }

    public void unlockAccount() {
        this.status = AccountStatus.ACTIVE;
        this.unlockToken = null;
        this.unlockTokenExpiration = null;
        this.resetFailedAttempts();
    }

}
