package no.country.eduplanner.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@PreAuthorize("denyAll()")
public class PrincipalController {


    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('CREATE')")
    public String admin(){
        return "Bienvenido Administrador";
    }

    @GetMapping("/estudiante")
    @PreAuthorize("hasAuthority('READ')")
    public String student(){
        return "Bienvenido Estudiante";
    }

}
