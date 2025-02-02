package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidVerificationTokenException extends AuthenticationException {

    public InvalidVerificationTokenException() {
        super("Código de verificación inválido", HttpStatus.BAD_REQUEST, "INVALID_VERIFICATION_TOKEN");
    }

    public InvalidVerificationTokenException(String message) {
        super(message);
    }

    public InvalidVerificationTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
