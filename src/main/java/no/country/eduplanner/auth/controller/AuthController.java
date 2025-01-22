package no.country.eduplanner.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.AuthResponse;
import no.country.eduplanner.auth.dto.LoginRequest;
import no.country.eduplanner.auth.dto.RegistrationRequest;
import no.country.eduplanner.auth.dto.TokenResponse;
import no.country.eduplanner.auth.services.AuthenticationService;
import org.springframework.http.HttpHeaders;
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