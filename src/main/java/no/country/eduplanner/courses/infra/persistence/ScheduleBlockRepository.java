package no.country.eduplanner.courses.infra.persistence;

import no.country.eduplanner.courses.domain.entity.ScheduleBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ScheduleBlockRepository extends JpaRepository<ScheduleBlock, Long> {

    @Query("SELECT sb FROM ScheduleBlock sb " +
           "LEFT JOIN FETCH sb.schedule s " +
           "LEFT JOIN FETCH s.course " +
           "WHERE sb.id = :blockId")
    Optional<ScheduleBlock> findByIdWithScheduleAndCourse(Long blockId);

    List<ScheduleBlock> findBySubjectId(Long subjectId);

    @Query(value = "SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (end_time - start_time))), 0) " +
                   "FROM schedule_blocks " +
                   "WHERE subject_id = :subjectId",
            nativeQuery = true)
    Long getTotalDurationInSecondsBySubjectId(@Param("subjectId") Long subjectId);
}
