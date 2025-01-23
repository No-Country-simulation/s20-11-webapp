package no.country.eduplanner.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {


    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("EducPlanner API")
                        .description("API REST para el sistema de planificación educativa EducPlanner. " +
                                     "Esta API permite gestionar cursos, asignaturas, horarios y notificaciones.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("EducPlanner")
                                .email("soporte@educplanner.com")
                                .url("https://github.com/No-Country-simulation/s20-11-webapp"))
                        .license(new License()
                                .name("Licencia MIT")
                                .url("https://opensource.org/licenses/MIT"))
                )
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080")
                                .description("Servidor local de desarrollo"),
                        new Server()
                                .url("https://eduplanner.fly.dev")
                                .description("Servidor de producción")
                ))
                .components(new Components()
                        .addSecuritySchemes("bearer-jwt", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Autenticación JWT. Usa el token obtenido en el endpoint de autenticación."))
                )
                .addSecurityItem(new SecurityRequirement().addList("bearer-jwt"));

    }
}
