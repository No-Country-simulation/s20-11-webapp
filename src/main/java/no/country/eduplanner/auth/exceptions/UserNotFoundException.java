package no.country.eduplanner.auth.exceptions;

import no.country.eduplanner.shared.application.exception.DomainException;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends DomainException {


    public UserNotFoundException(Long id) {
        super("No se encontró el usuario con id: " + id, HttpStatus.NOT_FOUND, "USER_NOT_FOUND");
    }


    public UserNotFoundException(String email) {
        super("No se encontró el usuario con email: " + email, HttpStatus.NOT_FOUND, "USER_NOT_FOUND");
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

