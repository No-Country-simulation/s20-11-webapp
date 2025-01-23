package no.country.eduplanner.courses.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public sealed interface CourseRequest {

    @Schema(description = "Solicitud para crear un nuevo curso")
    record Create(
            @Schema(
                    description = "Nombre del curso que se desea crear",
                    example = "Matemáticas Avanzadas"
            )
            String courseName
    ) implements CourseRequest {
    }


}
