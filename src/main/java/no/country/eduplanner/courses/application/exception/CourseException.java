package no.country.eduplanner.courses.application.exception;

import no.country.eduplanner.shared.application.exception.BaseException;
import org.springframework.http.HttpStatus;


public class CourseException extends BaseException {

    public CourseException(String message, HttpStatus statusCode, String errorCode) {
        super(message, statusCode, errorCode);
    }
}
