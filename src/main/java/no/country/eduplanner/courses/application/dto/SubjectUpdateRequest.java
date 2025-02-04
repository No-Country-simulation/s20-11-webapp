package no.country.eduplanner.courses.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SubjectUpdateRequest(
        @NotBlank(message = "El nombre de la asignatura no puede estar vacío.")
        @Size(min = 3, message = "El nombre de la asignatura debe tener al menos 3 caracteres.")
        String subjectName,

        @Size(min = 3, max = 20, message = "El nombre del profesor debe tener entre 3 y 20 caracteres.")
        String teacherName,

        @NotBlank(message = "El color no puede estar vacío.")
        @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "El color debe ser un código hexadecimal válido (ej. #FF5733).")
        String color,

        @NotNull(message = "El ID del curso es obligatorio.")
        Long courseId,

        @NotNull(message = "El ID de la asignatura es obligatorio.")
        Long subjectId
) {
}