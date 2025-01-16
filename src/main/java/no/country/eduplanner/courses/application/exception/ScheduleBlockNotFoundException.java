package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class ScheduleBlockNotFoundException extends CourseException {

    public ScheduleBlockNotFoundException(Long scheduleId) {
        super("No se encuentra bloque de horario con ID: [%d]".formatted(scheduleId), HttpStatus.NOT_FOUND);
    }

    public ScheduleBlockNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
