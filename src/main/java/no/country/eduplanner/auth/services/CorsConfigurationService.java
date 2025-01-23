package no.country.eduplanner.auth.services;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.stereotype.Service;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Service
public class CorsConfigurationService implements CorsConfigurationSource {


    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        config.setAllowedHeaders(List.of("*"));
        config.setExposedHeaders(List.of("Authorization"));
        return config;

    }

    public void configure(CorsConfigurer<HttpSecurity> cors) {
        cors.configurationSource(this);
    }

}

//TODO: PROD
//@Service
//@Setter
//@ConfigurationProperties(prefix = "app.security.cors")
//public class CorsConfigurationService implements CorsConfigurationSource {
//
//    private List<String> allowedOrigins;
//
//    @Override
//    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(allowedOrigins);
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//        config.setAllowedHeaders(List.of("*"));
//        config.setExposedHeaders(List.of("Authorization"));
//        return config;
//
//    }
//
//    public void configure(CorsConfigurer<HttpSecurity> cors) {
//        cors.configurationSource(this);
//    }
//
//}
