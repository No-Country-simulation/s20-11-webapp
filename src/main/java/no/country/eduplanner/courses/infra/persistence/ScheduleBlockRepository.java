package no.country.eduplanner.courses.infra.persistence;

import no.country.eduplanner.courses.domain.entity.ScheduleBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScheduleBlockRepository extends JpaRepository<ScheduleBlock, Long> {

    @Query("SELECT sb FROM ScheduleBlock sb " +
           "LEFT JOIN FETCH sb.schedule s " +
           "LEFT JOIN FETCH s.course " +
           "WHERE sb.id = :blockId")
    Optional<ScheduleBlock> findByIdWithScheduleAndCourse(Long blockId);
}
