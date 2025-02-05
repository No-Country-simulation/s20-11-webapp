package no.country.eduplanner.auth.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

@Getter
@RequiredArgsConstructor
public class SecurityUser implements UserDetails {

    private final UserEntity user;


    public static SecurityUser fromUserEntity(UserEntity user) {
        return new SecurityUser(user);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonLocked() {
        return !user.getStatus().isLocked();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !user.getStatus().isDisabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return user.getStatus().isActive();
    }

    public boolean hasRole(UserRole role) {
        return user.getRoles().contains(role);
    }

    public boolean hasAnyRole(UserRole... roles) {
        return Arrays.stream(roles)
                     .anyMatch(this::hasRole);
    }

    public long getId() {
        return user.getId();
    }
}
