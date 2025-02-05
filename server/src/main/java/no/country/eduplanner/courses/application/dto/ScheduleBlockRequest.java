package no.country.eduplanner.courses.application.dto;


import io.swagger.v3.oas.annotations.media.Schema;

@Schema(
        description = "Solicitud relacionada con bloques de horario. Puede ser una solicitud de actualización (Update) o eliminación de asignatura (RemoveSubject)."
)
public sealed interface ScheduleBlockRequest {

    @Schema(description = "Solicitud para actualizar un bloque de horario con una asignatura")
    record Update(
            @Schema(
                    description = "Identificador único del bloque de horario que se desea actualizar",
                    example = "12345"
            )
            Long blockId,

            @Schema(
                    description = "Identificador único de la asignatura que se asignará al bloque",
                    example = "67890"
            )
            Long subjectId
    ) implements ScheduleBlockRequest {
    }

    @Schema(description = "Solicitud para eliminar la asignatura de un bloque de horario")
    record RemoveSubject(
            @Schema(
                    description = "Identificador único del bloque de horario del cual se eliminará la asignatura",
                    example = "12345"
            )
            Long blockId
    ) implements ScheduleBlockRequest {
    }
}