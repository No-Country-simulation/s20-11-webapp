package no.country.eduplanner.auth.controller.apidocs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import no.country.eduplanner.auth.dto.UserData;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;

@Tag(
        name = "Usuario Actual",
        description = "API para obtener los datos del usuario autenticado actualmente."
)
public interface CurrentUserApi {

    @Operation(
            summary = "Obtener datos del usuario actual",
            description = "Devuelve los datos del usuario que ha iniciado sesión actualmente."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Datos del usuario obtenidos exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = UserData.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "No autorizado. El usuario no ha iniciado sesión o el token es inválido.",
                    content = @Content
            )
    })
    @GetMapping
    UserData getCurrentUserData();
}
