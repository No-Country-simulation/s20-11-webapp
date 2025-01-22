package no.country.eduplanner.auth.dtos;

import java.util.Set;

public record AuthResponse(
        Long userId,
        String email,
        Set<String> roles,
        TokenResponse tokens
) {
}
