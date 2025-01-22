package no.country.eduplanner.notification.infra.controller;

import no.country.eduplanner.notification.application.dto.NotificationDTO;
import no.country.eduplanner.notification.application.mapper.NotificationMapper;
import no.country.eduplanner.notification.domain.entities.NotificationEntity;
import no.country.eduplanner.notification.services.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;

    public NotificationController(NotificationService notificationService, NotificationMapper notificationMapper) {
        this.notificationService = notificationService;
        this.notificationMapper = notificationMapper;
    }

    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getAllNotifications() {
        List<NotificationEntity> notifications = notificationService.getAllNotifications();
        List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(notificationMapper::toDTO)
                .toList();
        return ResponseEntity.ok(notificationDTOs);
    }

    // Obtener notificaciones por curso
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByCourse(@PathVariable Long courseId) {
        List<NotificationEntity> notifications = notificationService.getNotificationsByCourse(courseId);
        List<NotificationDTO> notificationDTOs = notifications.stream()
                .map(notificationMapper::toDTO)
                .toList();
        return ResponseEntity.ok(notificationDTOs);
    }
}
