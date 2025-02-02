package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class UserAccountAlreadyVerifiedException extends AuthenticationException {

    public UserAccountAlreadyVerifiedException() {
        super("Cuenta ya se encuentra verificada", HttpStatus.BAD_REQUEST, "USER_ACCOUNT_ALREADY_VERIFIED");
    }

    public UserAccountAlreadyVerifiedException(String message) {
        super(message);
    }

    public UserAccountAlreadyVerifiedException(String message, Throwable cause) {
        super(message, cause);
    }
}
