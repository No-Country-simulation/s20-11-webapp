package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class InvalidFileSizeException extends AuthenticationException {

    public InvalidFileSizeException() {
        super("Archivo demasiado grande (max. 5MB)", HttpStatus.BAD_REQUEST, "INVALID_FILE_SIZE");
    }

    public InvalidFileSizeException(String message) {
        super(message);
    }

    public InvalidFileSizeException(String message, Throwable cause) {
        super(message, cause);
    }
}
