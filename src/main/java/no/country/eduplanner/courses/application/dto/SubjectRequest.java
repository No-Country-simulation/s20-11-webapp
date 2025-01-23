package no.country.eduplanner.courses.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Solicitud para crear una asignatura")
public record SubjectRequest(
        @Schema(
                description = "Nombre de la asignatura",
                example = "Matemáticas Avanzadas"
        )
        String name
) {
}