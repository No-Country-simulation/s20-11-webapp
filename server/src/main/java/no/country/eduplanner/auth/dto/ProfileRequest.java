package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Solicitud de modificacion del perfil de usuario")
public record ProfileRequest(

        @Schema(
                description = "Nombre del usuario",
                example = "Juan"
        )
        @NotBlank
        String firstName,

        @Schema(
                description = "Apellido del usuario",
                example = "Perez"
        )
        @NotBlank
        String lastName
) {
    public ProfileRequest {
    }

}

