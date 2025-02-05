package no.country.eduplanner.auth.controller.apidocs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import no.country.eduplanner.auth.dto.AuthResponse;
import no.country.eduplanner.auth.dto.LoginRequest;
import no.country.eduplanner.auth.dto.RegistrationRequest;
import no.country.eduplanner.auth.dto.TokenResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@Tag(
        name = "Autenticación",
        description = "API para autenticación. Maneja el inicio de sesión de usuarios registrados y el refresco del token JWT.")

public interface AuthApi {

    @Operation(
            summary = "Registrar nuevo usuario",
            description = "Registra un nuevo usuario en el sistema con los datos proporcionados, devolviendo tokens y detalles del usuario."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Registro exitoso",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Cuerpo de solicitud inválido o datos de registro incorrectos",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "El usuario ya existe",
                    content = @Content
            )
    })
    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    AuthResponse register(
            @RequestBody
            @Valid
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = RegistrationRequest.class)
                    )
            )
            RegistrationRequest registrationRequest);


    @Operation(
            summary = "Autenticar usuario",
            description = "Autentica un usuario con su correo electrónico y contraseña, devolviendo tokens y detalles del usuario"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Autenticación exitosa",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = AuthResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Credenciales inválidas",
                    content = @Content
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Cuerpo de solicitud inválido",
                    content = @Content
            )
    })
    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    AuthResponse login(
            @RequestBody
            @Valid
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = LoginRequest.class)
                    )
            )
            LoginRequest loginRequest);

    @Operation(
            summary = "Actualizar token de acceso",
            description = "Genera un nuevo token de acceso utilizando un token de actualización válido del encabezado de Autorización"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Tokens actualizados exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = TokenResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Token de actualización inválido o expirado",
                    content = @Content
            )
    })
    @PostMapping("/refresh")
    TokenResponse refreshToken(
            @RequestHeader(HttpHeaders.AUTHORIZATION)
            @Parameter(
                    description = "Token de actualización con prefijo 'Bearer '",
                    example = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    required = true
            )
            String authHeader);
}