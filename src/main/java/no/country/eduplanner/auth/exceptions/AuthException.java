package no.country.eduplanner.auth.exceptions;

public class AuthException extends CustomAuthException {

    public AuthException(String message) {
        super(message);
    }

    public AuthException(String message, Throwable cause) {
        super(message, cause);
    }
}
