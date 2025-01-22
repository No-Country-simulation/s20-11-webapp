package no.country.eduplanner.auth.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDTO {
    private String username;
    private String email;
    private String password;
    private String role;
}
