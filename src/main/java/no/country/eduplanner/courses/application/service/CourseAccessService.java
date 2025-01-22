package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.courses.application.exception.CourseNotFoundException;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import no.country.eduplanner.shared.application.exception.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseAccessService {

    private final CourseRepository courseRepository;
    private final UserDataService userDataService;


    public Course getCourseWithAccessCheck(Long courseId) {
        Course course = courseRepository.findById(courseId)
                                        .orElseThrow(() -> new CourseNotFoundException(courseId));

        verifyUserHasAccessToCourse(course);

        return course;
    }

    public Course getCourseWithClassDaysAndAccessCheck(Long courseId) {
        Course course = courseRepository.findByIdWithClassDays(courseId)
                                        .orElseThrow(() -> new CourseNotFoundException(courseId));

        verifyUserHasAccessToCourse(course);

        return course;
    }


    private void verifyUserHasAccessToCourse(Course course) {
        UserData currentUserData = userDataService.getCurrentUserData();

        //Admin tienen acceso a los cursos que ha creado
        if (currentUserData.roles().contains(UserRole.ADMIN)) {
            if (!course.getCreatedByUserId().equals(currentUserData.id())) {
                throw new UnauthorizedAccessException("No tienes acceso a este curso");
            }
        } else {
            //Estudiante solo tienen acceso a su curso asignado
            boolean hasAccess = courseRepository.existsByIdAndCourseUsers_UserId(course.getId(), currentUserData.id());
            if (!hasAccess) {
                throw new UnauthorizedAccessException("No tienes acceso a este curso");
            }
        }
    }


}
