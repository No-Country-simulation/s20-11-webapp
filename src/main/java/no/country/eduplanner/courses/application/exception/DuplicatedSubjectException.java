package no.country.eduplanner.courses.application.exception;

public class DuplicatedSubjectException extends RuntimeException {

    public DuplicatedSubjectException(String subjectName) {
        super("Ya existe una materia con nombre: [%s]".formatted(subjectName));
    }


}
