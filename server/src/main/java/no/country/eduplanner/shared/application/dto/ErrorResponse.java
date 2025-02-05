package no.country.eduplanner.shared.application.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {

    private String code;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String message;

    private Instant timestamp;

    public ErrorResponse(String code) {
        this.code = code;
        this.timestamp = Instant.now();
    }

}
