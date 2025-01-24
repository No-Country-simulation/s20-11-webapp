package no.country.eduplanner.auth.exceptions;

import no.country.eduplanner.shared.application.exception.BaseException;
import org.springframework.http.HttpStatus;

public class AuthenticationException extends BaseException {


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
