package no.country.eduplanner.auth.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity {

    private String email;

    private String password;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "firstName", column = @Column(name = "profile_first_name")),
            @AttributeOverride(name = "lastName", column = @Column(name = "profile_last_name")),
            @AttributeOverride(name = "photo", column = @Column(name = "profile_photo"))
    })
    private Profile profileInfo;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role", nullable = false)
    private Set<UserRole> roles = new HashSet<>();

}
