package no.country.eduplanner.courses.infra.persistence;

import no.country.eduplanner.courses.domain.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {

    List<Subject> findAllByCourseId(Long courseId);

    boolean existsByNameAndCourseId(String name, Long courseId);
}
