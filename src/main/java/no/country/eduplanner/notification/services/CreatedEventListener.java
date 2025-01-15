package no.country.eduplanner.notification.services;

import no.country.eduplanner.events.persistence.entities.CreatedEvent;
import no.country.eduplanner.events.persistence.entities.EventEntity;
import no.country.eduplanner.events.persistence.repositories.EventRepository;
import no.country.eduplanner.notification.persistence.entities.NotificationEntity;
import no.country.eduplanner.notification.persistence.repository.NotificationRepository;
import no.country.eduplanner.courses.persitence.entities.StudentEntity;
import no.country.eduplanner.courses.persitence.repositories.StudentRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CreatedEventListener {

    private final StudentRepository studentRepository;
    private final NotificationRepository notificationRepository;
    private final EventRepository eventRepository;

    public CreatedEventListener(StudentRepository studentRepository,
                                NotificationRepository notificationRepository,
                                EventRepository eventRepository) {
        this.studentRepository = studentRepository;
        this.notificationRepository = notificationRepository;
        this.eventRepository = eventRepository;
    }

    @EventListener
    public void handleCreatedEvent(CreatedEvent createdEvent) {
        // Recuperar el evento desde la base de datos
        EventEntity event = eventRepository.findById(createdEvent.getEventId())
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        // Obtener estudiantes asociados al curso del evento
        List<StudentEntity> students = studentRepository.findByCourse(event.getCourse());

        // Crear notificaciones
        List<NotificationEntity> notifications = students.stream()
                .map(estudiante -> new NotificationEntity(
                        null,
                        "Nuevo evento: " + event.getTitulo(),
                        false,
                        event
                ))
                .toList();

        // Guardar las notificaciones
        notificationRepository.saveAll(notifications);
    }
}
