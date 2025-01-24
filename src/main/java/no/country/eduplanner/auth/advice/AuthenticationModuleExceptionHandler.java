package no.country.eduplanner.auth.advice;

import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.exceptions.AuthenticationException;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.shared.application.dto.ApiResponse;
import no.country.eduplanner.shared.application.exception.BaseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AuthenticationModuleExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<?>> onAuthEx(AuthenticationException ex) {
        return handleError(ex);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> onUserNotFoundEx(UserNotFoundException ex) {
        return handleError(ex);
    }

    private static ResponseEntity<ApiResponse<?>> handleError(BaseException ex) {
        log.error("🔴👤 Error during authentication related request: {}", ex.getMessage());


        return ResponseEntity.status(ex.getStatusCode())
                             .body(ApiResponse.error(ex.getErrorCode(), ex.getMessage()));
    }


}



