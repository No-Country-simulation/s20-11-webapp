package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidRefreshTokenException extends AuthenticationException {

    public InvalidRefreshTokenException() {
        super("Token de refresco inválido", HttpStatus.UNAUTHORIZED, "INVALID_REFRESH_TOKEN");
    }

    public InvalidRefreshTokenException(String message) {
        super(message);
    }

    public InvalidRefreshTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
