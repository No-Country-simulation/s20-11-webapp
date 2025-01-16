package no.country.eduplanner.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;

public class TestRolesController {

    @GetMapping("/accessAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public String accessAdmin(){
        return "Hola, has accedido con el rol de Admin";
    }

    @GetMapping("/accessStudent")
    @PreAuthorize("hasRole('STUDENT')")
    public String accessStudent(){
        return "Hola, has accedido con el rol de Estudiante";
    }
}
