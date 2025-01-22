package no.country.eduplanner.notification.application.mapper;

import no.country.eduplanner.events.domain.entities.EventEntity;
import no.country.eduplanner.notification.application.dto.NotificationDTO;
import no.country.eduplanner.notification.domain.entities.NotificationEntity;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {


    public NotificationDTO toDTO(NotificationEntity notification) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(notification.getId());
        notificationDTO.setMessage(notification.getMessage());
        notificationDTO.setEventId(notification.getEvent().getId());
        notificationDTO.setCourseId(notification.getEvent().getCourse().getId());
        return notificationDTO;
    }


    public NotificationEntity toEntity(NotificationDTO notificationDTO, EventEntity event) {
        NotificationEntity notification = new NotificationEntity();
        notification.setId(notificationDTO.getId());
        notification.setMessage(notificationDTO.getMessage());
        notification.setEvent(event);
        return notification;
    }
}
