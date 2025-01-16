package no.country.eduplanner.courses.application.exception;

public class SubjectNotFoundException extends RuntimeException {

    public SubjectNotFoundException(Long subjectId) {
        super("No existe materia con ID: [%d]".formatted(subjectId));
    }

    public SubjectNotFoundException(String message) {
        super(message);
    }
}
