package no.country.eduplanner.notification.services;

import no.country.eduplanner.events.infra.persistence.EventRepository;
import no.country.eduplanner.notification.domain.entities.NotificationEntity;
import no.country.eduplanner.notification.infra.persistence.NotificationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationCleanupService {

    private final NotificationRepository notificationRepository;

    public NotificationCleanupService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Scheduled(cron = "0 0 0 * * ?") // Ejecutar a medianoche todos los días
    public void removeExpiredNotifications() {
        List<NotificationEntity> expiredNotifications = notificationRepository.findByEventDateBefore(LocalDate.now());
        notificationRepository.deleteAll(expiredNotifications);
    }
}
