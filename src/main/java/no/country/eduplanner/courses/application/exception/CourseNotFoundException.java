package no.country.eduplanner.courses.application.exception;

public class CourseNotFoundException extends RuntimeException {

    public CourseNotFoundException(Long courseId) {
        super("No existe curso con ID: [%d]".formatted(courseId));
    }

    public CourseNotFoundException(String message) {
        super(message);
    }
}
