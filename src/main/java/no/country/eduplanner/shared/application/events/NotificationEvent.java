package no.country.eduplanner.shared.application.events;

import java.time.LocalDateTime;

public record NotificationEvent(
        String message,
        LocalDateTime at
) {
}
