package no.country.eduplanner.auth.dto;

import java.time.Instant;

public record TokenResponse(
        String token,
        String refreshToken,
        Instant expiresAt
) {
}
