package no.country.eduplanner.auth.dto;

import jakarta.validation.constraints.Email;

public record ResendVerificationRequest(
        @Email
        String email
) {
}
