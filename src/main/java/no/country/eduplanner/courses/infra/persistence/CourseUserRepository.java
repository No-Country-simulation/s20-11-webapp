package no.country.eduplanner.courses.infra.persistence;

import no.country.eduplanner.courses.domain.entity.CourseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CourseUserRepository extends JpaRepository<CourseUser, Long> {

    @Query("SELECT cu.userId FROM CourseUser cu WHERE cu.course.id = :courseId")
    List<Long> findUserIdsByCourseId(Long courseId);


    Optional<CourseUser> findByUserId(Long userId);
}
