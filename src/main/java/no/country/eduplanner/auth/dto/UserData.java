package no.country.eduplanner.auth.dto;

public record UserData(
        Long id,
        String email,
        boolean isProfileComplete,
        String firstName,
        String lastName,
        String profilePhoto
) {
}
