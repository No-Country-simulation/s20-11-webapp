package no.country.eduplanner.courses.application.exception;

public class InvalidSubjectForTypeException extends CourseException {


    public InvalidSubjectForTypeException() {
        super("No se puede asignar una materia a un bloque de tipo BREAK");
    }
}
