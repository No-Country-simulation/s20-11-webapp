package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.courses.application.api.CourseAccessPort;
import no.country.eduplanner.courses.application.exception.CourseNotFoundException;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import no.country.eduplanner.shared.application.exception.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseAccessService implements CourseAccessPort {

    private final CourseRepository courseRepository;
    private final UserDataService userDataService;


    public Course getCourseWithAccessCheck(Long courseId) {
        verifyUserHasAccessToCourse(courseId);


        return courseRepository.findById(courseId)
                               .orElseThrow(() -> new CourseNotFoundException(courseId));
    }

    public Course getCourseWithClassDaysAndAccessCheck(Long courseId) {
        verifyUserHasAccessToCourse(courseId);


        return courseRepository.findByIdWithClassDays(courseId)
                               .orElseThrow(() -> new CourseNotFoundException(courseId));
    }

    @Override
    public void verifyUserHasAccessToCourse(Long courseId) {

        UserData currentUserData = userDataService.getCurrentUserData();

        boolean hasAccess = currentUserData.roles().contains(UserRole.ADMIN)
                ? verifyAdminAccess(courseId, currentUserData.id())
                : verifyStudentAccess(courseId, currentUserData.id());

        if (!hasAccess) {
            log.warn("Unauthorized access attempt to course {} by user {}",
                    courseId, currentUserData.id());
            throw new UnauthorizedAccessException("No tienes acceso a este curso");
        }
    }

    private boolean verifyAdminAccess(Long courseId, Long userId) {
        return courseRepository.existsByIdAndCreatedByUserId(courseId, userId);
    }

    private boolean verifyStudentAccess(Long courseId, Long userId) {
        return courseRepository.existsByIdAndCourseUsers_UserId(courseId, userId);
    }


}
