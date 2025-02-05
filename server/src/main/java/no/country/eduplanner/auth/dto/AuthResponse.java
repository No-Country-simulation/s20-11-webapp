package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Set;

@Schema(description = "Respuesta después de una autenticación exitosa")
public record AuthResponse(
        @Schema(
                description = "Identificador único del usuario autenticado",
                example = "1234"
        )
        Long userId,

        @Schema(
                description = "Dirección de correo electrónico del usuario autenticado",
                example = "user@example.com"
        )
        String email,

        @Schema(
                description = "Conjunto de roles asignados al usuario",
                example = "[\"STUDENT\", \"ADMIN\"]"
        )
        Set<String> roles,

        @Schema(
                description = "Tokens JWT para autenticación y actualización"
        )
        TokenResponse tokens
) {
}
