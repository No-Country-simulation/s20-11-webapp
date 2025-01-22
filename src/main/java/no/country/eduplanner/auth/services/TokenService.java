package no.country.eduplanner.auth.services;

import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import no.country.eduplanner.auth.models.UserEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import com.auth0.jwt.JWT;
import org.springframework.beans.factory.annotation.Value;
@Service
public class TokenService {

    @Value("${jwt.secret.key}")

    private String apiSecret;

    public String generarToken(UserEntity userEntity) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            var token = JWT.create()
                    .withIssuer("Security Eduplanner")
                    .withSubject(userEntity.getUsername())
                    .withClaim("id", userEntity.getId())
                    .withExpiresAt(generarFechaDeExpliracion())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException();
        }
    }

    public String getSubject(String token) {
        if (token == null) {
            throw new RuntimeException();
        }
        DecodedJWT verifier = null;

        try {
            Algorithm algorithm = Algorithm.HMAC256(apiSecret);
            verifier = JWT.require(algorithm)
                    .withIssuer("Security Eduplanner")
                    .build()
                    .verify(token);
            verifier.getSubject();
        } catch (JWTCreationException exception) {
            throw new RuntimeException("El token ha expirado");
        }
        if (verifier == null) {
            throw new RuntimeException("Verificación invalida");
        }
        return verifier.getSubject();
    }

    private Instant generarFechaDeExpliracion() {
        return LocalDateTime.now().plusHours(6).toInstant(ZoneOffset.of("-03:00"));
}
}