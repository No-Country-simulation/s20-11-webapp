package no.country.eduplanner.auth.controller;

import no.country.eduplanner.auth.dtos.LoginRequest;
import no.country.eduplanner.auth.dtos.LoginResponse;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );
        var user = (UserEntity) authentication.getPrincipal();
        var token = tokenService.generarToken(user);

        return ResponseEntity.ok(new LoginResponse(token));
    }
}