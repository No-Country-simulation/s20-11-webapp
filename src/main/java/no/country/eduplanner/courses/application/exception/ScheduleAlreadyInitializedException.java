package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class ScheduleAlreadyInitializedException extends CourseException{

    public ScheduleAlreadyInitializedException() {
        super("Ya existe un horario inicializado para este curso", HttpStatus.BAD_REQUEST, "SCHEDULE_ALREADY_INITIALIZED");
    }
}
