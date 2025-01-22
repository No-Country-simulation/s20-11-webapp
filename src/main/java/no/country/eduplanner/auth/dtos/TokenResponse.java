package no.country.eduplanner.auth.dtos;

import java.time.Instant;

public record TokenResponse(
        String token,
        String refreshToken,
        Instant expiresAt
) {
}
