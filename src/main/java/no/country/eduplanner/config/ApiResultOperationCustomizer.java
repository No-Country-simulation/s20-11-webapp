package no.country.eduplanner.config;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.web.method.HandlerMethod;

import java.util.Map;

public class ApiResultOperationCustomizer implements OperationCustomizer {

    @Override
    public Operation customize(Operation operation, HandlerMethod handlerMethod) {
        ApiResponses responses = operation.getResponses();
        if (responses != null) {
            for (Map.Entry<String, ApiResponse> entry : responses.entrySet()) {

                ApiResponse apiResponse = entry.getValue();
                Content content = apiResponse.getContent();

                if (content != null) {
                    for (Map.Entry<String, MediaType> mediaTypeEntry : content.entrySet()) {

                        MediaType mediaType = mediaTypeEntry.getValue();
                        Schema<?> schema = mediaType.getSchema();

                        if (schema != null) {
                            Schema<?> wrappedSchema = new Schema<>()
                                    .name("ApiResult")
                                    .addProperty("success", new Schema<>().type("boolean").example(true))
                                    .addProperty("data", schema);
                            mediaType.setSchema(wrappedSchema);
                        }
                    }
                }
            }
        }
        return operation;
    }
}