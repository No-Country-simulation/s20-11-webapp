package no.country.eduplanner.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@PreAuthorize("denyAll()")
public class TestAuthController {

    @GetMapping("/hello")
    @PreAuthorize("permitAll()")
    public String hello(){
        return "hello mundo";
    }


    @GetMapping("/hello-secured")
    @PreAuthorize("hasAuthority('READ')")
    public String helloSecured(){
        return "hello mundo secured";
    }


    @GetMapping("/hello-secured2")
    @PreAuthorize("hasAuthority('CREATE')")
    public String helloSecured2(){
        return "hello mundo secured2";
    }


}
