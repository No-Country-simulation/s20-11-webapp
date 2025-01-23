package no.country.eduplanner.notifications.infra.controller.apidocs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import no.country.eduplanner.notifications.application.dto.NotificationResponse;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Tag(
        name = "Notificaciones",
        description = "API para la gestión de notificaciones. Permite obtener notificaciones asociadas a cursos y notificaciones específicas por su ID."
)
public interface NotificationApi {

    @Operation(
            summary = "Obtener todas las notificaciones de un curso",
            description = "Devuelve una lista de todas las notificaciones asociadas a un curso específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de notificaciones obtenida exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = NotificationResponse.class, type = "array")
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso no encontrado",
                    content = @Content
            )
    })
    @GetMapping(value = "/{courseId}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationResponse> getAllNotificationsForCourse(
            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );

    @Operation(
            summary = "Obtener una notificación por su ID",
            description = "Devuelve los detalles de una notificación específica."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notificación obtenida exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = NotificationResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Notificación no encontrada",
                    content = @Content
            )
    })
    @GetMapping(value = "/{notificationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    NotificationResponse getEventById(
            @Parameter(
                    description = "Identificador único de la notificación",
                    example = "67890",
                    required = true
            )
            @PathVariable Long notificationId
    );
}