package no.country.eduplanner.notification.persistence.repository;

import no.country.eduplanner.notification.persistence.entities.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByEventDateBefore(LocalDate now);
}
