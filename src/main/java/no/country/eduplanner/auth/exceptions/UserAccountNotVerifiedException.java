package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class UserAccountNotVerifiedException extends AuthenticationException {

    public UserAccountNotVerifiedException() {
        super("Cuenta sin verificar", HttpStatus.UNAUTHORIZED, "UNVERIFIED_ACCOUNT");
    }

    public UserAccountNotVerifiedException(String message) {
        super(message);
    }

    public UserAccountNotVerifiedException(String message, Throwable cause) {
        super(message, cause);
    }
}
