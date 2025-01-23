package no.country.eduplanner.notifications.application.dto;

import java.time.LocalDateTime;

public record NotificationResponse(
        Long id,
        String title,
        String message,
        Long courseId,
        Long subjectId,
        LocalDateTime scheduledFor,
        String subjectColor,
        LocalDateTime createdAt,
        boolean expired
) {

}
