package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class DuplicatedCourseException extends CourseException {

    public DuplicatedCourseException(String subjectName) {
        super("Ya existe un curso con nombre: [%s]".formatted(subjectName), HttpStatus.CONFLICT, "DUPLICATED_COURSE");
    }


}
