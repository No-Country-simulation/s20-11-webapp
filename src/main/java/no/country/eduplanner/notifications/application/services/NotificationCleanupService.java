package no.country.eduplanner.notifications.application.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.notifications.domain.entities.Notification;
import no.country.eduplanner.notifications.infra.persistence.NotificationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationCleanupService {

    private final NotificationRepository notificationRepository;


    @Scheduled(cron = "0 0 0 * * ?") // Ejecutar a medianoche todos los días
    public void markAsExpired() {
        try {
            List<Notification> expiredNotifications = notificationRepository.findExpiringNotifications(LocalDateTime.now());

            if (!expiredNotifications.isEmpty()) {
                expiredNotifications.forEach(Notification::markAsExpired);
                notificationRepository.saveAll(expiredNotifications);
                log.info("Se han marcado {} notificaciones como expiradas", expiredNotifications.size());
            }
        } catch (Exception e) {
            log.error("Error al marcar notificaciones como expiradas", e);
        }
    }
}
