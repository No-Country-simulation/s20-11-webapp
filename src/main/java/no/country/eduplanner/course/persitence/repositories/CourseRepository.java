package no.country.eduplanner.course.persitence.repositories;

import no.country.eduplanner.course.persitence.entities.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long >{

}
