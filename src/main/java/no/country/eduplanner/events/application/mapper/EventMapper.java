package no.country.eduplanner.events.application.mapper;

    import no.country.eduplanner.events.application.dto.EventDTO;
    import no.country.eduplanner.events.domain.entities.EventEntity;
    import org.springframework.stereotype.Component;

    @Component
    public class EventMapper {

        public EventDTO toDTO(EventEntity event) {
            EventDTO eventDTO = new EventDTO();
            eventDTO.setId(event.getId());
            eventDTO.setTitle(event.getTitle());
            eventDTO.setDescription(event.getDescription());
            eventDTO.setDate(event.getDate());
            eventDTO.setCourseId(event.getCourse().getId());
            eventDTO.setSubjectId(event.getSubject().getId());
            return eventDTO;
        }

        public EventEntity toEntity(EventDTO eventDTO) {
            EventEntity event = new EventEntity();
            event.setId(eventDTO.getId());
            event.setTitle(eventDTO.getTitle());
            event.setDescription(eventDTO.getDescription());
            event.setDate(eventDTO.getDate());
            return event;
        }
    }


