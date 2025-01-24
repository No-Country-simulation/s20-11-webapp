package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends AuthenticationException {

    public InvalidCredentialsException() {
        super("Credenciales inválidas", HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS");
    }

    public InvalidCredentialsException(String message) {
        super(message);
    }

    public InvalidCredentialsException(String message, Throwable cause) {
        super(message, cause);
    }
}
