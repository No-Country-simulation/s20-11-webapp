package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;


public class CourseException extends RuntimeException {

    private final HttpStatus status;

    public CourseException() {
        this(HttpStatus.BAD_REQUEST);
    }

    public CourseException(String message) {
        this(message, HttpStatus.BAD_REQUEST);
    }

    protected CourseException(HttpStatus status) {
        this.status = status;
    }

    protected CourseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public CourseException(String message, Throwable cause) {
        this(message, cause, HttpStatus.BAD_REQUEST);
    }

    protected CourseException(String message, Throwable cause, HttpStatus status) {
        super(message, cause);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
