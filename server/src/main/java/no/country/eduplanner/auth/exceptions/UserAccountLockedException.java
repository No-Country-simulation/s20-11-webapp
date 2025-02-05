package no.country.eduplanner.auth.exceptions;

import org.springframework.http.HttpStatus;

public class UserAccountLockedException extends AuthenticationException {

    public UserAccountLockedException() {
        super("Cuenta bloqueada", HttpStatus.UNAUTHORIZED, "ACCOUNT_LOCKED");
    }

    public UserAccountLockedException(String message) {
        super(message);
    }

    public UserAccountLockedException(String message, Throwable cause) {
        super(message, cause);
    }
}
