package no.country.eduplanner.shared.application.dto;

import lombok.Builder;
import no.country.eduplanner.notifications.domain.enums.NotificationType;
import no.country.eduplanner.shared.domain.vo.AdaptableColor;

import java.time.LocalDateTime;

@Builder
public record NotificationRequest(
        String header,
        String title,
        String message,
        Long courseId,
        Long subjectId,
        LocalDateTime scheduledFor,
        AdaptableColor assignedColor,
        NotificationType type
) {


    public static NotificationRequest forSubject(NotificationRequest request) {
        return new NotificationRequest(request.header(), request.title(), request.message(), request.courseId(), request.subjectId(), request.scheduledFor(), request.assignedColor(), NotificationType.FOR_SUBJECT);
    }

    public static NotificationRequest forSubject(String header, String title, String message, Long courseId, Long subjectId, LocalDateTime scheduledFor, AdaptableColor assignedColor) {
        return new NotificationRequest(header, title, message, courseId, subjectId, scheduledFor, assignedColor, NotificationType.FOR_SUBJECT);
    }

}
