package no.country.eduplanner.courses.application.advice;

import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.courses.application.exception.CourseException;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@Slf4j
@RestControllerAdvice
public class ModuleExceptionHandler {

    @ExceptionHandler(CourseException.class)
    public ProblemDetail onCourseException(CourseException ex) {
        log.error("⚠ CourseException: {}", ex.getMessage());

        ProblemDetail pd = ProblemDetail.forStatus(ex.getStatus());
        pd.setDetail(ex.getMessage());
        pd.setTitle(ex.getClass().getSimpleName().replace("Exception", ""));
        pd.setProperty("timestamp", Instant.now());

        return pd;
    }

}



