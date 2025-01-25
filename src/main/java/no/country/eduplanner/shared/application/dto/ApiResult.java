package no.country.eduplanner.shared.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.Instant;

@Data
public class ApiResult<T> {

    @Schema(description = "Indica si la operación tuvo éxito", example = "true")
    private final boolean success;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "La respuesta del servicio, si la solicitud tuvo éxito", nullable = true)
    private final T data;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Schema(description = "Detalles del error, si la solicitud falló", nullable = true)
    private final ErrorResponse error;

    private ApiResult(boolean success, T data, ErrorResponse error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    public static <T> ApiResult<T> success(T data) {
        return new ApiResult<>(true, data, null);
    }

    public static <T> ApiResult<T> error(ErrorResponse error) {
        return new ApiResult<>(false, null, error);
    }

    public static <T> ApiResult<T> error(String code) {
        return error(new ErrorResponse(code));
    }

    public static <T> ApiResult<T> error(String code, String message) {
        return error(new ErrorResponse(code, message, Instant.now()));
    }

}
