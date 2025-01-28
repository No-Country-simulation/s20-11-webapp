package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.AuthResponse;
import no.country.eduplanner.auth.dto.LoginRequest;
import no.country.eduplanner.auth.dto.RegistrationRequest;
import no.country.eduplanner.auth.dto.TokenResponse;
import no.country.eduplanner.auth.exceptions.InvalidCredentialsException;
import no.country.eduplanner.auth.exceptions.InvalidRefreshTokenException;
import no.country.eduplanner.auth.exceptions.UserAlreadyRegisteredException;
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
        log.info("🔐 Registered user: {}", registeredUser.getEmail());
        TokenResponse tokens = generateTokens(registeredUser);

        return buildAuthResponse(registeredUser, tokens);
    }

    @Transactional(noRollbackFor = {InvalidCredentialsException.class})
    public AuthResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.email())
                                        .orElseThrow(InvalidCredentialsException::new);

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
            throw new InvalidCredentialsException();
        }
    }

    public TokenResponse refreshToken(String authHeader) {

        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            throw new InvalidRefreshTokenException();
        }
        String refreshToken = authHeader.substring(BEARER_PREFIX_LENGTH);
        String userEmail = jwtService.extractUserEmail(refreshToken);

        if (userEmail == null) {
            throw new InvalidRefreshTokenException();
        }

        UserEntity user = userRepository.findByEmail(userEmail)
                                        .orElseThrow(InvalidCredentialsException::new);


        if (!jwtService.isTokenValid(refreshToken)) {
            throw new InvalidRefreshTokenException();
        }

        TokenResponse tokenResponse = generateTokens(user);
        log.info("🔐 Refreshed token for user: {}", user.getEmail());
        return tokenResponse;
    }

    private void validateRegistration(RegistrationRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new UserAlreadyRegisteredException();
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
