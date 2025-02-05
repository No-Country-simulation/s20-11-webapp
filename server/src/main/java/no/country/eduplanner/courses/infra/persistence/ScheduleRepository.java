package no.country.eduplanner.courses.infra.persistence;

import no.country.eduplanner.courses.domain.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    Optional<Schedule> findByCourseId(Long courseId);

}
