package no.country.eduplanner.courses.application.exception;

import no.country.eduplanner.shared.application.exception.DomainException;
import org.springframework.http.HttpStatus;


public class CourseException extends DomainException {

    public CourseException(String message, HttpStatus statusCode, String errorCode) {
        super(message, statusCode, errorCode);
    }
}
