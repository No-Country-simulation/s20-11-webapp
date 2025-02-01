package no.country.eduplanner.notifications.infra.persistence;

import no.country.eduplanner.notifications.domain.entities.Notification;
import no.country.eduplanner.notifications.domain.enums.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByCourseIdOrderByScheduledForAsc(Long courseId);

    @Query("""
            select n from Notification n
            where n.scheduledFor < :expiredBefore
            and n.isExpired = false
            order by n.scheduledFor desc
            """)
    List<Notification> findExpiringNotifications(LocalDateTime expiredBefore);


    long countByCourseIdIn(List<Long> courseIds);


    @Query("SELECT COUNT(n) FROM Notification n WHERE n.courseId IN :courseIds AND n.isExpired = :isExpired")
    long countByCourseIdInAndIsExpired(
            @Param("courseIds") List<Long> courseIds,
            @Param("isExpired") boolean isExpired
    );

    @Query("SELECT COUNT(n) FROM Notification n WHERE n.courseId IN :courseIds AND n.isExpired = :isExpired AND n.type = :type")
    long countByCourseIdInAndIsExpiredAndType(
            @Param("courseIds") List<Long> courseIds,
            @Param("isExpired") boolean isExpired,
            @Param("type") NotificationType type
    );

}
