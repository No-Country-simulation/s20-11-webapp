package no.country.eduplanner.courses.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import no.country.eduplanner.courses.domain.enums.BlockType;
import no.country.eduplanner.courses.domain.vo.TimeRange;

public record ScheduleBlockResponse(
        @Schema(
                description = "Identificador único del bloque de horario",
                example = "12345"
        )
        Long id,

        @Schema(
                description = "Número de orden del bloque dentro del horario, para un día dado",
                example = "1"
        )
        Integer orderNumber,

        @Schema(
                description = "Rango de tiempo que cubre el bloque"
        )
        TimeRange timeRange,

        @Schema(
                description = "Tipo de bloque (por ejemplo, clase, descanso, almuerzo)"
        )
        BlockType type,

        @Schema(
                description = "Información de la asignatura asociada al bloque (si aplica)"
        )
        SubjectResponse subject
) {
}
