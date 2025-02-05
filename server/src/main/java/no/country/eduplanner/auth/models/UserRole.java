package no.country.eduplanner.auth.models;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ADMIN("ROLE_ADMIN"),
    STUDENT("ROLE_STUDENT");

    private final String authority;

    UserRole(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }

    public static UserRole fromAuthority(String authority) {
        String enumName = authority.startsWith("ROLE_") ? authority.substring(5) : authority;
        return UserRole.valueOf(enumName);
    }


}
