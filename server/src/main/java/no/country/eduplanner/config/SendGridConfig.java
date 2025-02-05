package no.country.eduplanner.config;

import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Slf4j
@Configuration
@EnableConfigurationProperties(SendGridConfigurationProperties.class)
@RequiredArgsConstructor
@Profile("prod")
public class SendGridConfig {

    private final SendGridConfigurationProperties sendGridConfigurationProperties;

    @Bean
    public SendGrid sendGrid() {

        String apiKey = sendGridConfigurationProperties.getApiKey();
        log.info("📧 SendGrid initialized with API key: {}", apiKey.substring(0, 5) + "...");
        return new SendGrid(apiKey);
    }

    public Email fromEmail() {
        String fromEmail = sendGridConfigurationProperties.getFromEmail();
        String fromName = sendGridConfigurationProperties.getFromName();

        return new Email(fromEmail, fromName);
    }

}
