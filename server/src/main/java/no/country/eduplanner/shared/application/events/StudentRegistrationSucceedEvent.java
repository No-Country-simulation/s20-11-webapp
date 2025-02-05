package no.country.eduplanner.shared.application.events;

public record StudentRegistrationSucceedEvent(
        Long userId,
        String email,
        String courseName,
        String tempPassword
) {
}
