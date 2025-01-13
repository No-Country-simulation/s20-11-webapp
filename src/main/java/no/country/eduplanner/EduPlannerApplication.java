package no.country.eduplanner;

import no.country.eduplanner.auth.persistence.entity.PermissionEntity;
import no.country.eduplanner.auth.persistence.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EduPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EduPlannerApplication.class, args);
    }

}
