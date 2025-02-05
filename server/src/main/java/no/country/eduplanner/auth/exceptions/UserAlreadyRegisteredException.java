package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class UserAlreadyRegisteredException extends AuthenticationException {

    public UserAlreadyRegisteredException() {
        super("Usuario ya se encuentra registrado con este email", HttpStatus.CONFLICT, "USER_ALREADY_REGISTERED");
    }
}
