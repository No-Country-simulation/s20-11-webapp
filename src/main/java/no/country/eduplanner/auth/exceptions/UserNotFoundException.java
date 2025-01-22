package no.country.eduplanner.auth.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super("No se encontró el usuario con id: " + id);
    }


    public UserNotFoundException(String email) {
        super("No se encontró el usuario con email: " + email);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

