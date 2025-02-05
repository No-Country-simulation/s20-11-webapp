package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class SubjectNotFoundException extends CourseException {

    public SubjectNotFoundException(Long subjectId) {
        super("No existe materia con ID: [%d]".formatted(subjectId), HttpStatus.NOT_FOUND, "SUBJECT_NOT_FOUND");
    }

}
