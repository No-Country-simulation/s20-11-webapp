package no.country.eduplanner.courses.application.advice;

import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.courses.application.exception.CourseException;
import no.country.eduplanner.shared.application.dto.ApiResponse;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@Slf4j
@RestControllerAdvice
public class CoursesModuleExceptionHandler {

    @ExceptionHandler(CourseException.class)
    public ResponseEntity<ApiResponse<?>> onCourseException(CourseException ex) {
        log.error("🔴👤 Error during authentication related request: {}", ex.getMessage());


        return ResponseEntity.status(ex.getStatusCode())
                             .body(ApiResponse.error(ex.getErrorCode(), ex.getMessage()));
    }

}



