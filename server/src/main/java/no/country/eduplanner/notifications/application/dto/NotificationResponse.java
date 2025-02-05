package no.country.eduplanner.notifications.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import no.country.eduplanner.shared.domain.vo.AdaptableColor;

import java.time.LocalDateTime;


@Schema(description = "Respuesta con la información de una notificación")
public record NotificationResponse(
        @Schema(
                description = "Identificador único de la notificación",
                example = "12345"
        )
        Long id,
        @Schema(
                description = "Título de la notificación. Puede ser el nombre de la asignatura, por ejemplo.",
                example = "Matemáticas"
        )
        String header,

        @Schema(
                description = "Título principal de la notificación.",
                example = "Exámen de potencias"
        )
        String title,

        @Schema(
                description = "Mensaje de la notificación",
                example = "Potencias de base y exponente entero, Multiplicación y división de potencias"
        )
        String message,

        @Schema(
                description = "Identificador único del curso asociado a la notificación",
                example = "67890"
        )
        Long courseId,

        @Schema(
                description = "Identificador único de la asignatura asociada a la notificación",
                example = "54321"
        )
        Long subjectId,

        @Schema(
                description = "Fecha y hora programada para el evento asociado a la notificación",
                example = "2023-12-01T10:00:00"
        )
        LocalDateTime scheduledFor,

        @Schema(
                description = "Color asociado a la asignatura (en formato hexadecimal)",
                example = "#FF5733"
        )
        AdaptableColor color,

        @Schema(
                description = "Fecha y hora de creación de la notificación",
                example = "2023-11-25T14:30:00"
        )
        LocalDateTime createdAt,

        @Schema(
                description = "Indica si la notificación ha expirado",
                example = "false"
        )
        boolean expired
) {
}