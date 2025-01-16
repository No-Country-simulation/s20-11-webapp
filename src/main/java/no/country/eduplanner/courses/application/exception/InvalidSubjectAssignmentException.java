package no.country.eduplanner.courses.application.exception;

public class InvalidSubjectAssignmentException extends RuntimeException {


    public InvalidSubjectAssignmentException() {
        super("Materia no pertenece al curso de este bloque");
    }
}
