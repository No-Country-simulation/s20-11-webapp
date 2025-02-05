package no.country.eduplanner.courses.application.exception;

import org.springframework.http.HttpStatus;

public class InvalidCourseConfigurationException extends CourseException{

    public InvalidCourseConfigurationException(String message) {
        super(message, HttpStatus.NOT_FOUND, "INVALID_COURSE_CONFIGURATION");
    }
}
