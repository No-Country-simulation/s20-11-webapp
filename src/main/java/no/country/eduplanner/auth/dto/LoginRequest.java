package no.country.eduplanner.auth.dto;

public record LoginRequest(
        String email,
        String password
) {
    public LoginRequest {
        email = email != null ? email.toLowerCase() : null;
    }

}
