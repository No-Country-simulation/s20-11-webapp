package no.country.eduplanner.courses.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import no.country.eduplanner.shared.domain.vo.AdaptableColor;

@Schema(description = "Respuesta con la información de una asignatura")
public record SubjectResponse(
        @Schema(
                description = "Identificador único de la asignatura",
                example = "67890"
        )
        Long id,

        @Schema(
                description = "Nombre de la asignatura",
                example = "Matemáticas Avanzadas"
        )
        String name,

        @Schema(
                description = "Color que representa la asignatura en formato hexadecimal",
                example = "#FF0000"
        )
        AdaptableColor color
) {
}
