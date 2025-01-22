package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class DuplicatedSubjectException extends CourseException {

    public DuplicatedSubjectException(String subjectName) {
        super("Ya existe una materia con nombre: [%s]".formatted(subjectName), HttpStatus.CONFLICT);
    }


}
