package no.country.eduplanner.courses.infra.controller.apidocs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.SortedMap;

@Tag(
        name = "Cursos",
        description = "API para la gestión de cursos. Permite crear cursos, obtener detalles, y gestionar horarios."
)
public interface CourseApi {

    @Operation(
            summary = "Crear un nuevo curso",
            description = "Crea un nuevo curso con la información proporcionada."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Curso creado exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = CourseResponse.Created.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Solicitud inválida",
                    content = @Content
            )
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<CourseResponse.Created> createCourse(
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos para crear un nuevo curso",
                    required = true,
                    content = @Content(
                            schema = @Schema(implementation = CourseRequest.Create.class)
                    )
            )
            CourseRequest.Create request
    );

    @Operation(
            summary = "Obtener detalles de un curso",
            description = "Obtiene los detalles completos de un curso específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Detalles del curso obtenidos exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = CourseResponse.Detailed.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso no encontrado",
                    content = @Content
            )
    })
    @GetMapping(value = "/{courseId}", produces = MediaType.APPLICATION_JSON_VALUE)
    CourseResponse.Detailed getCourseDetails(
            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );

    @Operation(
            summary = "Crear horario para un curso",
            description = "Genera un horario para un curso específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Horario creado exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = SortedMap.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso no encontrado",
                    content = @Content
            )
    })
    @PostMapping(value = "/{courseId}/schedule", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    SortedMap<DayOfWeek, List<ScheduleBlockResponse>> createScheduleForCourse(
            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );

    @Operation(
            summary = "Obtener horario actual de un curso",
            description = "Obtiene el horario actual de un curso específico."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Horario obtenido exitosamente",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = SortedMap.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Curso no encontrado",
                    content = @Content
            )
    })
    @GetMapping(value = "/{courseId}/schedule", produces = MediaType.APPLICATION_JSON_VALUE)
    SortedMap<DayOfWeek, List<ScheduleBlockResponse>> getCurrentScheduleForCourse(
            @Parameter(
                    description = "Identificador único del curso",
                    example = "12345",
                    required = true
            )
            @PathVariable Long courseId
    );
}