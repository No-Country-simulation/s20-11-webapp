package no.country.eduplanner.auth.services;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Service
@Setter
@ConfigurationProperties(prefix = "app.security.cors")
public class CorsConfigurationService implements CorsConfigurationSource {

    private String allowedOrigins;


    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();

        if (!StringUtils.hasText(allowedOrigins)) {
            throw new IllegalArgumentException("CORS_ALLOWED_ORIGINS is not properly configured");
        }
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        config.setAllowedOrigins(origins);

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);

        return config;

    }

    public void configure(CorsConfigurer<HttpSecurity> cors) {
        cors.configurationSource(this);
    }

}
