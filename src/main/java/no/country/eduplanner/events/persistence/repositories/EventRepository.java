package no.country.eduplanner.events.persistence.repositories;

import no.country.eduplanner.events.persistence.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long> {
}
