package no.country.eduplanner.events.sevices;

import no.country.eduplanner.events.persistence.entities.EventEntity;
import no.country.eduplanner.events.persistence.repositories.EventRepository;
import no.country.eduplanner.events.persistence.entities.CreatedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventService {
    @Autowired
    private final EventRepository eventRepository;
    private final ApplicationEventPublisher eventPublisher;

    public EventService(EventRepository eventRepository, ApplicationEventPublisher eventPublisher) {
        this.eventRepository = eventRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public EventEntity crearEvento(EventEntity event) {
        // Guardar el evento
        EventEntity nuevoEvento = eventRepository.save(event);

        // Publicar el evento personalizado
        eventPublisher.publishEvent(new CreatedEvent(this, nuevoEvento.getId()));

        return nuevoEvento;
    }
}
