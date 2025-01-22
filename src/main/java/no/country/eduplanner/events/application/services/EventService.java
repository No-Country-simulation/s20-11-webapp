package no.country.eduplanner.events.application.services;

import no.country.eduplanner.course.persitence.entities.CourseEntity;
import no.country.eduplanner.course.persitence.entities.SubjectEntity;
import no.country.eduplanner.course.persitence.repositories.CourseRepository;
import no.country.eduplanner.course.persitence.repositories.SubjectRepository;
import no.country.eduplanner.events.application.dto.EventDTO;
import no.country.eduplanner.events.application.mapper.EventMapper;
import no.country.eduplanner.events.domain.entities.CreatedEvent;
import no.country.eduplanner.events.domain.entities.EventEntity;
import no.country.eduplanner.events.infra.persistence.EventRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final CourseRepository courseRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final EventMapper eventMapper;
    private final SubjectRepository subjectRepository;

    public EventService(EventRepository eventRepository, CourseRepository courseRepository, ApplicationEventPublisher eventPublisher, EventMapper eventMapper, SubjectRepository subjectRepository) {
        this.eventRepository = eventRepository;
        this.courseRepository = courseRepository;
        this.eventPublisher = eventPublisher;
        this.eventMapper = eventMapper;
        this.subjectRepository = subjectRepository;
    }


    public EventEntity saveEvent(EventDTO eventDTO) {
        CourseEntity course = courseRepository.findById(eventDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        SubjectEntity subject = subjectRepository.findById(eventDTO.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        EventEntity event = eventMapper.toEntity(eventDTO);

        event.setCourse(course);
        event.setSubject(subject);

        event = eventRepository.save(event);
        eventPublisher.publishEvent(new CreatedEvent(this, event.getId(), event.getCourse().getId()));

        return event;
    }

    public List<EventDTO> getAllEvents() {
        List<EventEntity> events = eventRepository.findAll();
        return events.stream()
                .map(eventMapper::toDTO)
                .toList();
    }

    public EventDTO getEventById(Long id) {
        EventEntity event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return eventMapper.toDTO(event);
    }

    public EventEntity updateEvent(EventEntity event) {
        return event;
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public boolean exists(Long id) {
        return eventRepository.existsById(id);
    }
}

