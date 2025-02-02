package no.country.eduplanner.shared.application.events;

import java.time.LocalDateTime;

public record UserAccountLockedEvent(
        Long userId,
        String email,
        String unlockToken,
        LocalDateTime unlockTokenExpiration
) {
}
