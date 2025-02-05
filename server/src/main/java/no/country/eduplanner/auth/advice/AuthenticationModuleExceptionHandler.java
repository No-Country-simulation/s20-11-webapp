package no.country.eduplanner.auth.advice;

import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.exceptions.AuthenticationException;
import no.country.eduplanner.auth.exceptions.ImageUploadException;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.shared.application.dto.ApiResult;
import no.country.eduplanner.shared.application.exception.DomainException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AuthenticationModuleExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResult<?>> onAuthEx(AuthenticationException ex) {
        return handleError(ex);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResult<?>> onUserNotFoundEx(UserNotFoundException ex) {
        return handleError(ex);
    }

    @ExceptionHandler(ImageUploadException.class)
    public ResponseEntity<String> handleImageUploadException(ImageUploadException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    private static ResponseEntity<ApiResult<?>> handleError(DomainException ex) {
        log.error("🔴👤 Error during authentication related request: {}", ex.getMessage());


        return ResponseEntity.status(ex.getStatusCode())
                             .body(ApiResult.error(ex.getErrorCode(), ex.getMessage()));
    }


}



