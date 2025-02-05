package no.country.eduplanner.shared.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class DomainException extends RuntimeException {

    private String errorCode;
    private HttpStatus statusCode;

    protected DomainException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    protected DomainException(String message, HttpStatus statusCode, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    public DomainException() {
        super();
    }

    public DomainException(String message) {
        super(message);
    }

    public DomainException(String message, Throwable cause) {
        super(message, cause);
    }

    public DomainException(Throwable cause) {
        super(cause);
    }
}
