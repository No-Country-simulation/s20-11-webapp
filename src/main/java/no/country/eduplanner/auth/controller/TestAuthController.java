package no.country.eduplanner.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class TestAuthController {

    @GetMapping("/hello")
    public String hello(){
        return "hello mundo";
    }

    @GetMapping("/hello-secured")
    public String helloSecured(){
        return "hello mundo secured";
    }

}
