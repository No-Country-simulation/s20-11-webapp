package no.country.eduplanner.notification.services;

import no.country.eduplanner.course.persitence.entities.CourseEntity;
import no.country.eduplanner.course.persitence.repositories.CourseRepository;
import no.country.eduplanner.events.domain.entities.CreatedEvent;
import no.country.eduplanner.events.domain.entities.EventEntity;
import no.country.eduplanner.events.infra.persistence.EventRepository;
import no.country.eduplanner.notification.domain.entities.NotificationEntity;
import no.country.eduplanner.notification.infra.persistence.NotificationRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final CourseRepository courseRepository;
    private final EventRepository eventRepository;

    public NotificationService(NotificationRepository notificationRepository, CourseRepository courseRepository, EventRepository eventRepository) {
        this.notificationRepository = notificationRepository;
        this.courseRepository = courseRepository;
        this.eventRepository = eventRepository;
    }

    @EventListener
    public void handleEventCreated(CreatedEvent createdEvent) {
        Long eventId = createdEvent.getEventId();
        Long courseId = createdEvent.getCourseId();

        EventEntity event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        NotificationEntity notification = new NotificationEntity();
        notification.setMessage("New event: " + event.getTitle() + " on " + event.getDate());
        notification.setEvent(event);
        notification.setCourse(course);

        notificationRepository.save(notification);
    }

    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public List<NotificationEntity> getNotificationsByCourse(Long courseId) {
        return notificationRepository.findByCourse_Id(courseId);
    }
}
