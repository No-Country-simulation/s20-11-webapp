package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "Solicitud de modificacion del perfil de usuario")
public record ProfileRequest(

        @Schema(
                description = "Nombre del usuario",
                example = "Juan"
        )
        String firstName ,

        @Schema(
                description = "Apellido del usuario",
                example = "Perez"
        )
        String lastName
) {
public ProfileRequest{}

}

