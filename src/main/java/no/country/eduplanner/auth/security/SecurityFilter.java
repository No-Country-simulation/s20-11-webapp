package no.country.eduplanner.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.auth.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // Obtenemos el token del header
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.replace("Bearer ", "");
            String userName = tokenService.getSubject(token); // Extrae el nombre del usuario

            if (userName != null) {
                // Buscar usuario en la base de datos
                Optional<UserEntity> optionalUsuario = userRepository.findByEmail(userName);
                if (optionalUsuario.isPresent()) {
                    UserEntity usuario = optionalUsuario.get(); // Obtener el usuario del Optional

                    var authentication = new UsernamePasswordAuthenticationToken(
                            usuario, null, usuario.getAuthorities() // Usar getAuthorities() aquí
                    );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
}
}