package no.country.eduplanner.events.persistence.entities;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter

public class CreatedEvent extends ApplicationEvent {
    private final Long eventId;
    private final Long courseId;

    public CreatedEvent(Object source, Long eventId, Long courseId) {
        super(source);
        this.eventId = eventId;
        this.courseId = courseId;
    }
}
