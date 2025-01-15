package no.country.eduplanner.course.persitence.repositories;

import no.country.eduplanner.course.persitence.entities.CourseEntity;
import no.country.eduplanner.course.persitence.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    List<StudentEntity> findByCourse(CourseEntity course);
}
