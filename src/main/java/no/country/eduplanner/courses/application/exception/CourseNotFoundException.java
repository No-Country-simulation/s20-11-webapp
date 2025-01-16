package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class CourseNotFoundException extends CourseException {

    public CourseNotFoundException(Long courseId) {
        super("No existe curso con ID: [%d]".formatted(courseId), HttpStatus.NOT_FOUND);
    }

    public CourseNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
