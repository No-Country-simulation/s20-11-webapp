package no.country.eduplanner.shared.application.events;

public record StudentRegistrationEvent(
        String courseName,
        String email
) {
}
