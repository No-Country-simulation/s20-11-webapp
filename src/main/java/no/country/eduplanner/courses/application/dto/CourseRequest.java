package no.country.eduplanner.courses.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

public sealed interface CourseRequest {

    @Schema(description = "Solicitud para crear un nuevo curso")
    record Create(
            @Schema(
                    description = "Nombre del curso que se desea crear",
                    example = "Matemáticas Avanzadas"
            )
            @Size(min = 3, message = "El nombre del curso debe tener al menos 3 caracteres")
            String courseName
    ) implements CourseRequest {
    }


}
