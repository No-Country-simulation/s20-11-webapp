package no.country.eduplanner.notifications.infra.persistence;

import no.country.eduplanner.notifications.domain.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByCourseIdOrderByScheduledForDesc(Long courseId);

    @Query("""
            select n from Notification n
            where n.scheduledFor < :expiredBefore
            and n.isExpired = false
            order by n.scheduledFor desc
            """)
    List<Notification> findExpiringNotifications(LocalDateTime expiredBefore);

}
