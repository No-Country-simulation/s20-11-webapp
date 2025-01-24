package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidTokenException extends AuthenticationException {
    public InvalidTokenException(String message, HttpStatus statusCode, String errorCode) {
        super(message, statusCode, errorCode);
    }

    public InvalidTokenException(String message) {
        super("Token de acceso invalido: "+message, HttpStatus.UNAUTHORIZED, "INVALID_TOKEN");
    }


}
