package no.country.eduplanner.auth.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import org.hibernate.validator.constraints.Length;

public record RegistrationRequest(

        @Email
        String email,

        @Length(min = 8)
        String password,

        String passwordConfirmation

) {
    public RegistrationRequest {
        email = email != null ? email.toLowerCase().trim() : null;
    }

    @AssertTrue(message = "Passwords do not match")
    private boolean passwordsMatch() {
        return password != null && password.equals(passwordConfirmation);
    }


}
