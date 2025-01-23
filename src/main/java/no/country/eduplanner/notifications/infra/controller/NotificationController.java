package no.country.eduplanner.notifications.infra.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.notifications.application.dto.NotificationResponse;
import no.country.eduplanner.notifications.application.services.NotificationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // Obtener todas las notificaciones de un curso
    @GetMapping("/{courseId}")
    public List<NotificationResponse> getAllNotificationsForCourse(@PathVariable Long courseId) {
        return notificationService.getAllNotificationsForCourse(courseId);
    }

    // Obtener notificación por id
    @GetMapping("/{notificationId}")
    public NotificationResponse getEventById(@PathVariable Long notificationId) {
        return notificationService.getNotificationById(notificationId);
    }
// TODO:
//    // Actualizar un evento
//    @PutMapping("/{id}")
//    public ResponseEntity<NotificationRequest> updateEvent(@PathVariable Long id, @RequestBody NotificationRequest notificationRequest) {
//        if(!eventService.exists(id)){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        notificationRequest.setId(id);
//        Notification updatedEvent = eventService.saveEvent(notificationRequest);
//        NotificationRequest updatedNotificationRequest = eventMapper.toDTO(updatedEvent);
//        return ResponseEntity.ok(updatedNotificationRequest);
//    }
//
//    // Eliminar un evento
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
//        eventService.deleteEvent(id);
//        return ResponseEntity.noContent().build();
//    }
}

