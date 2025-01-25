package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import no.country.eduplanner.auth.models.UserRole;

import java.util.Set;

@Schema(description = "Datos del usuario autenticado")
public record UserData(
        @Schema(
                description = "Identificador único del usuario",
                example = "12345"
        )
        Long id,

        @Schema(
                description = "Dirección de correo electrónico del usuario",
                example = "user@example.com"
        )
        String email,

        @Schema(
                description = "Roles asignados al usuario",
                example = "[\"STUDENT\", \"ADMIN\"]"
        )
        Set<String> roles,

        @Schema(
                description = "Indica si el perfil del usuario está completo",
                example = "true"
        )
        boolean isProfileComplete,

        @Schema(
                description = "Nombre del usuario",
                example = "John"
        )
        String firstName,

        @Schema(
                description = "Apellido del usuario",
                example = "Doe"
        )
        String lastName,

        @Schema(
                description = "URL de la foto de perfil del usuario",
                example = "https://example.com/profile.jpg"
        )
        String profilePhoto
) {
}