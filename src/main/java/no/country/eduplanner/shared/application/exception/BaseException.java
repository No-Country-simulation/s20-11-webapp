package no.country.eduplanner.shared.application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BaseException extends RuntimeException {

    private String errorCode;
    private HttpStatus statusCode;

    protected BaseException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    protected BaseException(String message, HttpStatus statusCode, String errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    public BaseException() {
        super();
    }

    public BaseException(String message) {
        super(message);
    }

    public BaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public BaseException(Throwable cause) {
        super(cause);
    }
}
