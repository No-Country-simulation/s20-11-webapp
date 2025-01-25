package no.country.eduplanner.courses.infra.controller.apidocs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import no.country.eduplanner.courses.application.dto.*;
import no.country.eduplanner.shared.application.dto.NotificationRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(
        name = "Asignaturas",
        description = "API para la gestión de asignaturas. Permite crear, actualizar, eliminar y listar asignaturas, así como gestionar su asociación con bloques de horario."
)
public interface SubjectApi {

    @Operation(
            summary = "Crear una asignatura para un curso",
            description = "Crea una nueva asignatura asociada a un curso específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Asignatura creada exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = SubjectResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Solicitud inválida",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso no encontrado",
                    content = @Content
            )
    })
    @PostMapping(value = "/{courseId}/subjects", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<SubjectResponse> createSubjectForCourse(
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos para crear una nueva asignatura",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = SubjectRequest.class)
                    )
            )
            SubjectRequest request,

            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );

    @Operation(
            summary = "Publicar una notificación para una asignatura",
            description = "Publica un evento de notificación relacionado con una asignatura."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Notificación publicada exitosamente"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Solicitud inválida",
                    content = @Content
            )
    })
    @PostMapping(value = "/send-notification", consumes = MediaType.APPLICATION_JSON_VALUE)
    void publishNotificationForSubject(
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos de la notificación",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = NotificationRequest.class)
                    )
            )
            @Valid NotificationRequest request
    );

    @Operation(
            summary = "Actualizar la asignatura de un bloque de horario",
            description = "Asocia una asignatura a un bloque de horario específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Asignatura actualizada exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ScheduleBlockResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Solicitud inválida",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso o bloque no encontrado",
                    content = @Content
            )
    })
    @PutMapping(value = "/{courseId}/subjects/add-to-block", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ScheduleBlockResponse updateSubjectForBlock(
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos para actualizar la asignatura de un bloque",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = ScheduleBlockRequest.Update.class)
                    )
            )
            ScheduleBlockRequest.Update request,

            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );

    @Operation(
            summary = "Obtener todas las asignaturas de un curso",
            description = "Devuelve una lista de todas las asignaturas asociadas a un curso específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de asignaturas obtenida exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            array = @ArraySchema(schema = @Schema(implementation = SubjectResponse.class))

                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso no encontrado",
                    content = @Content
            )
    })
    @GetMapping(value = "/{courseId}/subjects", produces = MediaType.APPLICATION_JSON_VALUE)
    Iterable<SubjectResponse> getAllSubjectsForCourse(
            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );

    @Operation(
            summary = "Eliminar una asignatura de un bloque de horario",
            description = "Elimina la asociación de una asignatura con un bloque de horario específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Asignatura eliminada del bloque exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = ScheduleBlockResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Solicitud inválida",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso o bloque no encontrado",
                    content = @Content
            )
    })
    @DeleteMapping(value = "/{courseId}/subjects/remove-from-block", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ScheduleBlockResponse removeSubjectFromBlock(
            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId,

            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos para eliminar la asignatura de un bloque",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = ScheduleBlockRequest.RemoveSubject.class)
                    )
            )
            ScheduleBlockRequest.RemoveSubject request
    );
}