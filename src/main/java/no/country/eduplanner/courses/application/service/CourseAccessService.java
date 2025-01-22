package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.exception.CourseNotFoundException;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseAccessService {

    private final CourseRepository courseRepository;


    public Course getCourseWithAccessCheck(Long courseId) {
        Course course = courseRepository.findById(courseId)
                                        .orElseThrow(() -> new CourseNotFoundException(courseId));

        // TODO: Uncomment when auth is done
        // verifyUserHasAccessToCourse(course);

        return course;
    }

    public Course getCourseWithClassDaysAndAccessCheck(Long courseId) {
        Course course = courseRepository.findByIdWithClassDays(courseId)
                                        .orElseThrow(() -> new CourseNotFoundException(courseId));

        // TODO: Uncomment when auth is done
        // verifyUserHasAccessToCourse(course);

        return course;
    }


    // TODO: ADD LATER: 👇
    /*
    private void verifyUserHasAccessToCourse(Course course) {
        User currentUser = getCurrentAuthenticatedUser();
        if (!course.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedAccessException("No tienes acceso a este curso");
        }
    }
    */
}
