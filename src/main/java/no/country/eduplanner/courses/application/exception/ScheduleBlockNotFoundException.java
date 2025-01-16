package no.country.eduplanner.courses.application.exception;

public class ScheduleBlockNotFoundException extends RuntimeException {

    public ScheduleBlockNotFoundException(Long scheduleId) {
        super("No se encuentra bloque de horario con ID: [%d]".formatted(scheduleId));
    }

    public ScheduleBlockNotFoundException(String message) {
        super(message);
    }
}
