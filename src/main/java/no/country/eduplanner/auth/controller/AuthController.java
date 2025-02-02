package no.country.eduplanner.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.*;
import no.country.eduplanner.auth.services.AuthenticationService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public void register(@RequestBody @Valid RegistrationRequest registrationRequest) {
         authenticationService.register(registrationRequest);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/refresh")
    public TokenResponse refreshToken(@RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {
        return authenticationService.refreshToken(authHeader);
    }

    @PostMapping("/verify")//This should be a POST
    public AuthResponse verifyEmail(@RequestBody AccountTokenRequest request) {
       return authenticationService.verifyAccountEmail(request.token());
    }

    @PostMapping("/resend-verification")
    public void resendVerification(@RequestBody @Valid RegistrationRequest registrationRequest) {
        authenticationService.resendVerification(registrationRequest.email());
    }


    @PostMapping("/unlock-account")
    public String unlockAccount(@RequestBody AccountTokenRequest request) {

        boolean isUnlocked = authenticationService.verifyUnlockRequest(request);
        return isUnlocked
                ? "Cuenta desbloqueada con éxito"
                : "Token inválido o expirado";
    }
}