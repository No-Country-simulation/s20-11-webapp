package no.country.eduplanner.auth.controller;

import no.country.eduplanner.auth.dtos.RegisterDTO;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth") // Este es el endpoint base
public class RegisterController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        // Lógica para registrar el usuario
        UserEntity newUser = userService.registerNewUser(registerDTO);
        return ResponseEntity.ok(newUser);
    }
}