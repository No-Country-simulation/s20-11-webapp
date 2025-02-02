package no.country.eduplanner.auth.security.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.exceptions.InvalidRefreshTokenException;
import no.country.eduplanner.auth.exceptions.InvalidTokenException;
import no.country.eduplanner.auth.exceptions.TokenExpiredException;
import no.country.eduplanner.auth.models.AccountStatus;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.auth.security.SecurityUser;
import no.country.eduplanner.auth.services.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenService {

    private static final String ISSUER = "EduPlanner";

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private Long timeExpiration;

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshTokenExpiration;

    private final UserService userService;


    public String generateAccessToken(UserEntity user) {
        return buildToken(user, timeExpiration);
    }

    public String generateRefreshToken(UserEntity user) {
        return buildToken(user, refreshTokenExpiration);
    }

    //Validar el token de acceso
    public boolean isTokenValid(String token) {
        try {
            String userEmail = extractUserEmail(token);
            if (userEmail == null) {
                throw new InvalidTokenException("Correo electrónico no es válido");
            }
            if (isTokenExpired(token)) {
                throw new TokenExpiredException();
            }
            return true;
        } catch (JwtException e) {
            log.error("Token validation error: {}", e.getMessage());
            throw new InvalidTokenException(e.getMessage());
        }
    }


    public Instant extractExpiration(String token) {
        return extractAllClaims(token).getExpiration().toInstant();
    }

    public String extractUserEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    @SuppressWarnings("unchecked")
    public UserDetails buildUserDetailsFromToken(String token) {
        String userEmail = extractUserEmail(token);
        List<String> roles = (List<String>) extractAllClaims(token).get("roles");

        Set<UserRole> userRoles = roles.stream().map(UserRole::fromAuthority).collect(Collectors.toSet());

        AccountStatus accountStatus = AccountStatus.fromString((String) extractAllClaims(token).get("accountStatus"));

        UserEntity user = UserEntity.builder()
                                    .email(userEmail)
                                    .roles(userRoles)
                                    .status(accountStatus)
                                    .build();



        return SecurityUser.fromUserEntity(user);
    }

    @SuppressWarnings("unchecked")
    public UserDetails buildUserDetailsFromTokenWithDBCall(String token) {
        String userEmail = extractUserEmail(token);
        List<String> roles = (List<String>) extractAllClaims(token).get("roles");

        Set<UserRole> userRoles = roles.stream().map(UserRole::fromAuthority).collect(Collectors.toSet());

        AccountStatus accountStatus = userService.getAccountStatus(userEmail); //TODO: If using this, remove claims from token

        UserEntity user = UserEntity.builder()
                                    .email(userEmail)
                                    .roles(userRoles)
                                    .status(accountStatus)
                                    .build();

        return SecurityUser.fromUserEntity(user);
    }

    public SecurityUser getUserFromToken(String token) {
        String userEmail = extractUserEmail(token);
        return (SecurityUser) userService.loadUserByUsername(userEmail);
    }




    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser().
                       verifyWith(getSignatureKey())
                       .build()
                       .parseSignedClaims(token)
                       .getPayload();
        } catch (ExpiredJwtException e) {
            log.debug("Token expired: {}", e.getMessage());
            throw new InvalidRefreshTokenException("Token expirado");
        } catch (JwtException e) {
            log.warn("Invalid token: {}", e.getMessage());
            throw new InvalidRefreshTokenException("Token inválido");
        }
    }

    //Firma del Token
    private SecretKey getSignatureKey() {
        try {
            byte[] keyBytes = Decoders.BASE64.decode(secretKey);
            return Keys.hmacShaKeyFor(keyBytes);
        } catch (DecodingException e) {
            log.error("Invalid JWT secret key encoding: {}", e.getMessage());
            throw new SecurityException("Invalid JWT secret key configuration");
        }
    }


    private String buildToken(UserEntity user, Long tokenExpiration) {
        Instant now = Instant.now();
        return Jwts.builder()
                   .id(user.getId().toString())
                   .claims(Map.of(
                           "roles", user.getRoles().stream()
                                        .map(UserRole::getAuthority)
                                        .toList(),
                           "accountStatus", user.getStatus().name()
                   ))
                   .subject(user.getEmail())
                   .issuer(ISSUER)
                   .issuedAt(Date.from(now))
                   .expiration(Date.from(now.plusMillis(tokenExpiration)))
                   .signWith(getSignatureKey())
                   .compact();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).isBefore(Instant.now());
    }

}