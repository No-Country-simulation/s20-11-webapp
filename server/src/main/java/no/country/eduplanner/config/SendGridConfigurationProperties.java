package no.country.eduplanner.config;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "app.sendgrid")
@Getter
@Setter
public class SendGridConfigurationProperties {

    @NotBlank
    private String apiKey;

    @NotBlank
    private String fromEmail;

    @NotBlank
    private String fromName;

}
