package no.country.eduplanner.auth.dto;

import java.util.Set;

public record AuthResponse(
        Long userId,
        String email,
        Set<String> roles,
        TokenResponse tokens
) {
}
