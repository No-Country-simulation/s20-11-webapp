package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.services.StudentUserRegistrationService;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.exception.CourseNotFoundException;
import no.country.eduplanner.courses.application.mapper.CourseMapper;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.CourseUser;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import no.country.eduplanner.courses.infra.persistence.CourseUserRepository;
import no.country.eduplanner.shared.application.exception.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CourseEnrollmentService {


    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final CourseAccessService courseAccessService;
    private final UserDataService userDataService;
    private final StudentUserRegistrationService studentRegistrationService;
    private final CourseUserRepository courseUserRepository;


    public CourseResponse.Detailed getCourseForCurrentStudent() {
        UserData currentUser = userDataService.getCurrentUserData();
        if (!currentUser.roles().contains(UserRole.STUDENT.getAuthority())) {
            throw new UnauthorizedAccessException("Solo estudiantes pueden ver su curso asignado");
        }
        CourseUser courseUser = courseUserRepository
                .findByUserId(currentUser.id())
                .orElseThrow(() -> new CourseNotFoundException(currentUser.id()));

        Course course = courseRepository.findByIdWithClassDays(courseUser.getCourse().getId())
                                        .orElseThrow(() -> new CourseNotFoundException(courseUser.getCourse().getId()));

        return courseMapper.toDetailed(course);
    }

    public void registerStudentForCourse(Long courseId, CourseRequest.RegisterStudent studentRequest) {

        Course course = courseAccessService.getCourseWithAccessCheck(courseId);

        UserEntity studentUser = studentRegistrationService.registerStudent(studentRequest.email(), course.getName());

        course.addUser(studentUser.getId());
        courseRepository.save(course);
        log.info("👨‍🎓 Student {} added to course {}", studentUser.getEmail(), course.getName());
    }

    public List<UserData> getAllStudentsForCourse(Long courseId) {
        courseAccessService.verifyUserHasAccessToCourse(courseId);
        return userDataService.getUsersDataFromIdsByRole(courseUserRepository.findUserIdsByCourseId(courseId), UserRole.STUDENT);
    }


}
