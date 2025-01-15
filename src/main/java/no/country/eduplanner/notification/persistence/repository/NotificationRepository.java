package no.country.eduplanner.notification.persistence.repository;

import no.country.eduplanner.notification.persistence.entities.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
}
