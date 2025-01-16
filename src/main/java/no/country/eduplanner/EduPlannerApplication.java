package no.country.eduplanner;

import no.country.eduplanner.auth.models.ERole;
import no.country.eduplanner.auth.models.RoleEntity;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@SpringBootApplication
public class EduPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EduPlannerApplication.class, args);
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Bean
    CommandLineRunner init(){
        return args -> {

            UserEntity userEntity = UserEntity.builder()
                    .email("faibol_men19@hotmail.com")
                    .username("fievel")
                    .password(passwordEncoder.encode("1234"))
                    .roles(Set.of(RoleEntity.builder()
                            .name(ERole.valueOf(ERole.ADMIN.name()))
                            .build()))
                    .build();

            UserEntity userEntity2 = UserEntity.builder()
                    .email("nena@hotmail.com")
                    .username("Nena")
                    .password(passwordEncoder.encode("1234"))
                    .roles(Set.of(RoleEntity.builder()
                            .name(ERole.valueOf(ERole.STUDENT.name()))
                            .build()))
                    .build();

            userRepository.save(userEntity);
            userRepository.save(userEntity2);
        };
    }
}
