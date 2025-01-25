package no.country.eduplanner.courses.application.advice;

import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.courses.application.exception.CourseException;
import no.country.eduplanner.shared.application.dto.ApiResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CoursesModuleExceptionHandler {

    @ExceptionHandler(CourseException.class)
    public ResponseEntity<ApiResult<?>> onCourseException(CourseException ex) {
        log.error("🔴📚 Error during course related request: {}", ex.getMessage());


        return ResponseEntity.status(ex.getStatusCode())
                             .body(ApiResult.error(ex.getErrorCode(), ex.getMessage()));
    }

}



