package no.country.eduplanner.events.infra.controller;

import no.country.eduplanner.course.persitence.repositories.CourseRepository;
import no.country.eduplanner.events.application.dto.EventDTO;
import no.country.eduplanner.events.application.mapper.EventMapper;
import no.country.eduplanner.events.application.services.EventService;
import no.country.eduplanner.events.domain.entities.EventEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;

    public EventController(EventService eventService, EventMapper eventMapper, CourseRepository courseRepository) {
        this.eventService = eventService;
        this.eventMapper = eventMapper;
    }

    // Crear un nuevo evento
    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDTO) {
        EventEntity createdEvent = eventService.saveEvent(eventDTO);
        EventDTO createdEventDTO = eventMapper.toDTO(createdEvent);
        return ResponseEntity.status(201).body(createdEventDTO);
    }

    // Obtener todos los eventos
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> eventDTOs = eventService.getAllEvents();
        return ResponseEntity.ok(eventDTOs);
    }

    // Obtener un evento por id
    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long id) {
        EventDTO eventDTO = eventService.getEventById(id);
        return ResponseEntity.ok(eventDTO);
    }

    // Actualizar un evento
    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        if(!eventService.exists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        eventDTO.setId(id);
        EventEntity updatedEvent = eventService.saveEvent(eventDTO);
        EventDTO updatedEventDTO = eventMapper.toDTO(updatedEvent);
        return ResponseEntity.ok(updatedEventDTO);
    }

    // Eliminar un evento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }
}

