package no.country.eduplanner.courses.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import no.country.eduplanner.shared.application.dto.AuditInfo;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

@Schema(
        description = "Respuesta relacionada con un curso. Puede ser una respuesta básica (Created) o detallada (Detailed)."
)
public sealed interface CourseResponse {

    @Schema(description = "Respuesta básica después de la creación de un curso")
    record Created(
            @Schema(
                    description = "Identificador único del curso creado",
                    example = "12345"
            )
            Long id,

            @Schema(
                    description = "Información de auditoría del curso"
            )
            AuditInfo auditInfo

    ) implements CourseResponse {
    }

    @Schema(description = "Respuesta detallada con toda la información de un curso")
    record Detailed(
            @Schema(
                    description = "Identificador único del curso",
                    example = "12345"
            )
            Long id,

            @Schema(
                    description = "Nombre del curso",
                    example = "Matemáticas Avanzadas"
            )
            String name,

            @Schema(
                    description = "Hora de inicio de la clase",
                    example = "08:00:00"
            )
            LocalTime classStartTime,

            @Schema(
                    description = "Número de bloques antes del almuerzo",
                    example = "3"
            )
            int blocksBeforeLunch,

            @Schema(
                    description = "Número de bloques después del almuerzo",
                    example = "2"
            )
            int blocksAfterLunch,

            @Schema(
                    description = "Total de bloques por día",
                    example = "5"
            )
            int totalBlocksPerDay,

            @Schema(
                    description = "Días de la semana en los que se imparte el curso",
                    example = "[\"MONDAY\", \"WEDNESDAY\", \"FRIDAY\"]"
            )
            Set<DayOfWeek> classDays,

            @Schema(
                    description = "Duración de cada bloque en minutos",
                    example = "45"
            )
            Long blockDurationInMinutes,

            @Schema(
                    description = "Duración de los descansos entre bloques en minutos",
                    example = "10"
            )
            Long breakDurationInMinutes,

            @Schema(
                    description = "Duración del almuerzo en minutos",
                    example = "60"
            )
            Long lunchDurationInMinutes,

            @Schema(
                    description = "Información de auditoría del curso"
            )
            AuditInfo auditInfo
    ) implements CourseResponse {
    }

}
