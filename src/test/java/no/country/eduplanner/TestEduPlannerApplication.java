package no.country.eduplanner;

import org.springframework.boot.SpringApplication;

public class TestEduPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.from(EduPlannerApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
