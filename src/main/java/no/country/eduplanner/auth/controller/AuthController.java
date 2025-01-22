package no.country.eduplanner.auth.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dtos.LoginRequest;
import no.country.eduplanner.auth.dtos.AuthResponse;
import no.country.eduplanner.auth.dtos.TokenResponse;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody @Valid RegistrationRequest registrationRequest) {
        return authenticationService.register(registrationRequest);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/refresh")
    public TokenResponse refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return authenticationService.refreshToken(authHeader);
    }
}