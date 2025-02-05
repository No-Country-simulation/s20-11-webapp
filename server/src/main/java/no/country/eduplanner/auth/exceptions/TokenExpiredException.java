package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class TokenExpiredException extends AuthenticationException {

    public TokenExpiredException() {
        super("Token expirado", HttpStatus.UNAUTHORIZED, "TOKEN_EXPIRED");
    }

    public TokenExpiredException(String message) {
        super(message);
    }

    public TokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
