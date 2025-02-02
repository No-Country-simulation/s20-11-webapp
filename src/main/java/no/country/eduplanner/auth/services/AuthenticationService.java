package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.*;
import no.country.eduplanner.auth.exceptions.*;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.auth.security.jwt.JwtTokenService;
import no.country.eduplanner.shared.application.events.NewUserRegisteredEvent;
import no.country.eduplanner.shared.application.events.UserAccountLockedEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static no.country.eduplanner.auth.security.jwt.JwtUtils.BEARER_PREFIX;
import static no.country.eduplanner.auth.security.jwt.JwtUtils.BEARER_PREFIX_LENGTH;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenService jwtService;
    private final ApplicationEventPublisher eventPublisher;

    public void register(RegistrationRequest request) {
        validateRegistration(request);
        UserEntity newUser = UserEntity.builder()
                                       .email(request.email())
                                       .password(passwordEncoder.encode(request.password()))
                                       .verificationToken(generateVerificationToken())
                                       .tokenExpiration(LocalDateTime.now().plusHours(1))
                                       .roles(Set.of(UserRole.ADMIN))
                                       .build();

        UserEntity registeredUser = userRepository.save(newUser);
        log.info("🔐 Registered user: {}", registeredUser.getEmail());

        eventPublisher.publishEvent(new NewUserRegisteredEvent(
                registeredUser.getEmail(),
                registeredUser.getVerificationToken(),
                registeredUser.getTokenExpiration()));
    }

    //TODO: REQUEST A NEW VERIFICATION TOKEN??


    public AuthResponse verifyAccountEmail(String verificationToken) {
        UserEntity user = userRepository.findByVerificationToken(verificationToken)
                                        .orElseThrow(InvalidVerificationTokenException::new);

        if (!user.getStatus().isUnverified()) {
            //Front never reaches here because of requireAnonymous()
            throw new UserAccountAlreadyVerifiedException();
        }

        user.activateAccount();
        userRepository.save(user);
        log.info("🔐 Activated account for user [{}]", user.getEmail());

        TokenResponse tokens = generateTokens(user);

        return buildAuthResponse(user, tokens);

    }

    public void resendVerification(String email) {

        UserEntity user = userRepository.findByEmail(email)
                                        .orElseThrow(() -> new UserNotFoundException(email));
        if (!user.getStatus().isUnverified()) {
            throw new UserAccountAlreadyVerifiedException();
        }

        log.info("🔐 Resending verification email to user [{}]", email);

        user.setVerificationToken(generateVerificationToken());
        user.setTokenExpiration((LocalDateTime.now().plusHours(1)));

        user = userRepository.save(user);

        eventPublisher.publishEvent(new NewUserRegisteredEvent(
                user.getEmail(),
                user.getVerificationToken(),
                user.getTokenExpiration()));

    }

    @Transactional(noRollbackFor = {InvalidCredentialsException.class})
    public AuthResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.email())
                                        .orElseThrow(InvalidCredentialsException::new);

        if (user.getStatus().isLocked()) {
            throw new UserAccountLockedException();
        }

        if (!user.getStatus().isActive()) {
            throw new UserAccountNotVerifiedException();
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password())
            );
            handleSuccessfulLogin(user);
            TokenResponse tokens = generateTokens(user);
            return buildAuthResponse(user, tokens);

        } catch (AuthenticationException e) {
            handleFailedLogin(user);
            throw new InvalidCredentialsException();
        }
    }

    public boolean verifyUnlockRequest(AccountTokenRequest request) {
        Optional<UserEntity> userOptional = userRepository.findByUnlockToken(request.token());
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            if (user.isUnlockTokenValid()) {
                user.unlockAccount();
                userRepository.save(user);
                log.info("🔐 Unlocked account for user [{}]", user.getEmail());
                return true;
            }

        }
        return false;

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
        log.info("🔐 Refreshed token for user: [{}] at [{}]", userEmail, LocalDateTime.now());
        return tokenResponse;
    }

    private void handleFailedLogin(UserEntity user) {
        user.incrementFailedAttemptsCount();

        if (user.getStatus().isLocked()) {
            eventPublisher.publishEvent(new UserAccountLockedEvent(
                    user.getId(),
                    user.getEmail(),
                    user.getUnlockToken(),
                    user.getUnlockTokenExpiration()));
            log.info("🔐 Locked user [{}] after [{}] failed login attempts", user.getEmail(), user.getFailedLoginAttemptsCount());
        }

        log.info("Login failed for user [{}]: {} failed attempts", user.getEmail(), user.getFailedLoginAttemptsCount());

    }

    private void handleSuccessfulLogin(UserEntity user) {
        user.recordSuccessfulLogin();
        log.info("👤 Login successful for user [{}] at [{}]", user.getEmail(), LocalDateTime.now());
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
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
