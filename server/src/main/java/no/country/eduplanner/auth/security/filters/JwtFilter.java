package no.country.eduplanner.auth.security.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.exceptions.AuthenticationException;
import no.country.eduplanner.auth.security.SecurityUser;
import no.country.eduplanner.auth.security.jwt.JwtTokenService;
import no.country.eduplanner.auth.security.jwt.JwtUtils;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtService;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws SecurityException, IOException, ServletException {

        try {


            String jwtToken = jwtUtils.extractToken(request);

            if (jwtToken == null) {
                filterChain.doFilter(request, response);
                return;
            }
            jwtService.isTokenValid(jwtToken);
            processToken(jwtToken, request);

        } catch (AuthenticationException e) {
            log.error("🚫 Authentication error", e);
            throw e;
        }

        filterChain.doFilter(request, response);
    }

    private void processToken(String token, HttpServletRequest request) {
        String userEmail = jwtService.extractUserEmail(token);

        if (userEmail == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            return;
        }

        UserDetails userFromToken = jwtService.buildUserDetailsFromTokenWithDBCall(token); //Could maybe not query db

        if (!userFromToken.isEnabled()) {
            throw new DisabledException("Account is not active");
        }
        if (!userFromToken.isAccountNonLocked()) {
            throw new LockedException("Account is locked");
        }
        if (!userFromToken.isAccountNonExpired()) {
            throw new AccountExpiredException("Account expired");
        }
        if (!userFromToken.isCredentialsNonExpired()) {
            throw new CredentialsExpiredException("Credentials expired");
        }


        authenticateUser(userFromToken, request);

    }

    private void authenticateUser(UserDetails userFromToken, HttpServletRequest request) {
        var authToken = new UsernamePasswordAuthenticationToken(
                userFromToken,
                null,
                userFromToken.getAuthorities()
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

}

