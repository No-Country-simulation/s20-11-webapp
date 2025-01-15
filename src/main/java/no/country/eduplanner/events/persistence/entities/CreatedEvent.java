package no.country.eduplanner.events.persistence.entities;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class CreatedEvent extends ApplicationEvent {
    private final Long eventId;

    public CreatedEvent(Object source, Long eventId) {
        super(source);
        this.eventId = eventId;
    }
}
