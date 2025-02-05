package no.country.eduplanner.notifications.application.mapper;

import no.country.eduplanner.notifications.application.dto.NotificationResponse;
import no.country.eduplanner.notifications.domain.entities.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public NotificationResponse toResponse(Notification entity) {
        return new NotificationResponse(
                entity.getId(),
                entity.getHeader(),
                entity.getTitle(),
                entity.getMessage(),
                entity.getCourseId(),
                entity.getSubjectId(),
                entity.getScheduledFor(),
                entity.getAssignedColor(),
                entity.getCreatedAt(),
                entity.isExpired()
        );

    }
}


