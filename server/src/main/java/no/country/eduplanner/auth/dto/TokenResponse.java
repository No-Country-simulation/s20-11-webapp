package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

@Schema(description = "Respuesta con los tokens de autenticación y la fecha de expiración")
public record TokenResponse(
        @Schema(
                description = "Token de acceso JWT",
                example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        )
        String token,

        @Schema(
                description = "Token de refresco JWT",
                example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        )
        String refreshToken,

        @Schema(
                description = "Fecha y hora de expiración del token de acceso",
                example = "2023-12-31T23:59:59Z"
        )
        Instant expiresAt
) {
}