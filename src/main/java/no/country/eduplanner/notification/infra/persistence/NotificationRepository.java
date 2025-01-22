package no.country.eduplanner.notification.infra.persistence;

import no.country.eduplanner.notification.domain.entities.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    @Query("SELECT n FROM NotificationEntity n WHERE n.event.date < :date")
    List<NotificationEntity> findByEventDateBefore(@Param("date") LocalDate date);

    List<NotificationEntity> findByCourse_Id(Long courseId);
}
