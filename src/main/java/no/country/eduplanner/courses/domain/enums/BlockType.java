package no.country.eduplanner.courses.domain.enums;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Tipo de bloque en el horario")
public enum BlockType {
    @Schema(description = "Bloque para una clase")
    CLASS,

    @Schema(description = "Bloque para un descanso")
    BREAK,

    @Schema(description = "Bloque para el almuerzo")
    LUNCH,

    @Schema(description = "Bloque libre")
    FREE
}
