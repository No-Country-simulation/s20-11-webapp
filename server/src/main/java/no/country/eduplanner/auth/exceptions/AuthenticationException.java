package no.country.eduplanner.auth.exceptions;

import no.country.eduplanner.shared.application.exception.DomainException;
import org.springframework.http.HttpStatus;

public class AuthenticationException extends DomainException {


    public AuthenticationException(String message, HttpStatus statusCode, String errorCode) {
        super(message, statusCode, errorCode);
    }

    public AuthenticationException() {
        super();
    }

    public AuthenticationException(String message) {
        super(message);
    }

    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }

    public AuthenticationException(Throwable cause) {
        super(cause);
    }
}
