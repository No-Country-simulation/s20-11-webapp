package no.country.eduplanner.courses.infra.persistence;

import no.country.eduplanner.courses.domain.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c LEFT JOIN FETCH c.classDays WHERE c.id = :id")
    Optional<Course> findByIdWithClassDays(Long id);
}
