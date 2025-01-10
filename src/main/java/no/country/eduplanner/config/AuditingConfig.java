package no.country.eduplanner.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.lang.NonNull;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditingConfig {

    public static final String SYSTEM = "EduPlanner-SYSTEM";

    @Bean
    @NonNull
    public AuditorAware<String> auditorProvider() {
        return () -> Optional.of(SYSTEM);
    }

    /*
     * TODO: Una vez que la autenticación esté funcionando, reemplazar por configuración de abajo 👇
     * */

//    @Bean
//    @NonNull
//    public AuditorAware<String> auditorProvider() {
//        return () -> {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            if (authentication == null
//                || !authentication.isAuthenticated()
//                || "anonymousUser".equals(authentication.getPrincipal())) {
//
//                return Optional.of(SYSTEM);
//
//            }
//            return Optional.of(authentication.getName());
//        };
//    }
}
