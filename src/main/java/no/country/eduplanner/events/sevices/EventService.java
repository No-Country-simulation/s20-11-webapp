package no.country.eduplanner.events.sevices;

import no.country.eduplanner.course.persitence.entities.CourseEntity;
import no.country.eduplanner.course.persitence.repositories.CourseRepository;
import no.country.eduplanner.events.persistence.entities.CreatedEvent;
import no.country.eduplanner.events.persistence.entities.EventEntity;
import no.country.eduplanner.events.persistence.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final CourseRepository courseRepository;
    private final ApplicationEventPublisher eventPublisher;

    public EventService(EventRepository eventRepository, CourseRepository courseRepository, ApplicationEventPublisher eventPublisher) {
        this.eventRepository = eventRepository;
        this.courseRepository = courseRepository;
        this.eventPublisher = eventPublisher;
    }

    public EventEntity createEvent(Long courseId, String title, LocalDate date) {
        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        EventEntity event = new EventEntity();
        event.setTitle(title);
        event.setDate(date);
        event.setCourse(course);

        event = eventRepository.save(event);

        eventPublisher.publishEvent(new CreatedEvent(this, event.getId(), courseId));

        return event;
    }
}

