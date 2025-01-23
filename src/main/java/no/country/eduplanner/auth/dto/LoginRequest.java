package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Solicitud de inicio de sesión de un usuario")
public record LoginRequest(
        @Schema(
                description = "Dirección de correo electrónico del usuario",
                example = "user@example.com"
        )
        String email,

        @Schema(
                description = "Contraseña del usuario",
                example = "password123"
        )
        String password
) {
    public LoginRequest {
        email = email != null ? email.toLowerCase() : null;
    }
}