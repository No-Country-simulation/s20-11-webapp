package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.AuthResponse;
import no.country.eduplanner.auth.dto.LoginRequest;
import no.country.eduplanner.auth.dto.RegistrationRequest;
import no.country.eduplanner.auth.dto.TokenResponse;
import no.country.eduplanner.auth.exceptions.AuthException;
import no.country.eduplanner.auth.exceptions.TokenException;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.auth.security.jwt.JwtTokenService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

import static no.country.eduplanner.auth.security.jwt.JwtUtils.BEARER_PREFIX;
import static no.country.eduplanner.auth.security.jwt.JwtUtils.BEARER_PREFIX_LENGTH;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenService jwtService;

    public AuthResponse register(RegistrationRequest request) {
        validateRegistration(request);
        UserEntity newUser = UserEntity.builder()
                                       .email(request.email())
                                       .password(passwordEncoder.encode(request.password()))
                                       .roles(Set.of(UserRole.ADMIN))
                                       .build();

        UserEntity registeredUser = userRepository.save(newUser);
        TokenResponse tokens = generateTokens(registeredUser);

        return buildAuthResponse(registeredUser, tokens);
    }

    @Transactional(noRollbackFor = {AuthException.class})
    public AuthResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.email())
                                        .orElseThrow(() -> new RuntimeException(
                                                "Usuario no encontrado con email : " + request.email()));

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password())
            );

            TokenResponse tokens = generateTokens(user);
            return buildAuthResponse(user, tokens);

        } catch (AuthenticationException e) {
            log.warn("Login failed for user [{}]: {}", request.email(), e.getClass());
            throw new AuthException("Credenciales inválidas");
        }
    }

    public TokenResponse refreshToken(String authHeader) {

        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            throw new TokenException("Token de refresco inválido");
        }
        String refreshToken = authHeader.substring(BEARER_PREFIX_LENGTH);
        String userEmail = jwtService.extractUserEmail(refreshToken);

        if (userEmail == null) {
            throw new TokenException("Token de refresco inválido");
        }

        UserEntity user = userRepository.findByEmail(userEmail)
                                        .orElseThrow(() -> new AuthException("Credenciales inválidas"));


        if (!jwtService.isTokenValid(refreshToken)) {
            throw new TokenException("Token de refresco inválido");
        }

        TokenResponse tokenResponse = generateTokens(user);
        log.info("🔐 Refreshed token for user: {}", user.getEmail());
        return tokenResponse;
    }

    private void validateRegistration(RegistrationRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new AuthException("Usuario con email [%s] ya se encuentra registrado."
                    .formatted(request.email()));
        }

    }

    private TokenResponse generateTokens(UserEntity user) {
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new TokenResponse(accessToken, refreshToken, jwtService.extractExpiration(accessToken));
    }

    private AuthResponse buildAuthResponse(UserEntity user, TokenResponse tokens) {
        return new AuthResponse(
                user.getId(),
                user.getEmail(),
                user.getRoles().stream().map(UserRole::getAuthority).collect(Collectors.toSet()),
                tokens
        );
    }


}
