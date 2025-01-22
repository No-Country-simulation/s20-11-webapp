package no.country.eduplanner.auth.dto;

import no.country.eduplanner.auth.models.UserRole;

import java.util.Set;

public record UserData(
        Long id,
        String email,
        Set<UserRole> roles,
        boolean isProfileComplete,
        String firstName,
        String lastName,
        String profilePhoto
) {
}
