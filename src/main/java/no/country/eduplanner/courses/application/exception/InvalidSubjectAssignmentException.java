package no.country.eduplanner.courses.application.exception;

public class InvalidSubjectAssignmentException extends CourseException {


    public InvalidSubjectAssignmentException() {
        super("Materia no pertenece al curso de este bloque");
    }
}
