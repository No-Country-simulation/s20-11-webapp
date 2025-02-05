package no.country.eduplanner.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import org.hibernate.validator.constraints.Length;

@Schema(description = "Solicitud de registro de un nuevo usuario")
public record RegistrationRequest(

        @Schema(
                description = "Dirección de correo electrónico del usuario",
                example = "user@example.com"
        )
        @Email(message = "El correo electrónico debe tener un formato válido")
        String email,

        @Schema(
                description = "Contraseña del usuario. Debe tener al menos 8 caracteres.",
                example = "password123"
        )
        @Length(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
        String password,

        @Schema(
                description = "Confirmación de la contraseña. Debe coincidir con el campo 'password'.",
                example = "password123"
        )
        String passwordConfirmation

) {
    public RegistrationRequest {
        email = email != null ? email.toLowerCase().trim() : null;
    }

    @AssertTrue(message = "Las contraseñas no coinciden")
    private boolean passwordsMatch() {
        return password != null && password.equals(passwordConfirmation);
    }


}
