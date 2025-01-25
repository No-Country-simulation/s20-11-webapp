package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class InvalidSubjectForTypeException extends CourseException {


    public InvalidSubjectForTypeException() {
        super("No se puede asignar una materia a un bloque de tipo BREAK", HttpStatus.BAD_REQUEST, "INVALID_SUBJECT_FOR_TYPE");
    }
}
