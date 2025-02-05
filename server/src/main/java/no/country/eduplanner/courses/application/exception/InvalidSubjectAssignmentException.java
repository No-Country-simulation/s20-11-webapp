package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class InvalidSubjectAssignmentException extends CourseException {


    public InvalidSubjectAssignmentException() {
        super("Materia no pertenece al curso de este bloque", HttpStatus.BAD_REQUEST, "INVALID_SUBJECT_ASSIGNMENT");
    }
}
