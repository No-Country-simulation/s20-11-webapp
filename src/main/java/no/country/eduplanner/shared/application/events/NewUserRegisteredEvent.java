package no.country.eduplanner.shared.application.events;

import lombok.Builder;

import java.time.LocalDateTime;


public record NewUserRegisteredEvent(
        String email,
        String verificationToken,
        LocalDateTime verificationExpiration
) {
}
