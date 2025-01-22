package no.country.eduplanner.auth.exceptions;

public class TokenException extends CustomAuthException {

    public TokenException(String message) {
        super(message);
    }

    public TokenException(String message, Throwable cause) {
        super(message, cause);
    }
}
