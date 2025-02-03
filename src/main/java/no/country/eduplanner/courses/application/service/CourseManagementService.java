package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.services.StudentUserRegistrationService;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.exception.DuplicatedCourseException;
import no.country.eduplanner.courses.application.mapper.CourseMapper;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.Schedule;
import no.country.eduplanner.courses.domain.factory.CourseFactory;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import no.country.eduplanner.courses.infra.persistence.CourseUserRepository;
import no.country.eduplanner.courses.infra.persistence.ScheduleRepository;
import no.country.eduplanner.shared.application.exception.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseManagementService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final CourseFactory courseFactory;
    private final CourseScheduleService courseScheduleService;
    private final CourseAccessService courseAccessService;
    private final UserDataService userDataService;

    public CourseResponse.Created createCourse(CourseRequest.Create request) {
        UserData currentUser = userDataService.getCurrentUserData();

        if (!currentUser.roles().contains(UserRole.ADMIN.getAuthority())) {
            throw new UnauthorizedAccessException("Solo administradores pueden crear cursos");
        }

        validateCourseRequest(request, currentUser.id());

        Course course = courseRepository.save(
                courseFactory.createDefault(request.courseName(), currentUser.id())
        );

        course.addUser(currentUser.id());
        courseScheduleService.initializeSchedule(course);

        return courseMapper.toCreated(course);
    }

    public CourseResponse.Detailed getCourseDetailsById(Long courseId) {
        Course course = courseAccessService.getCourseWithClassDaysAndAccessCheck(courseId);
        return courseMapper.toDetailed(course);
    }

    public List<CourseResponse.Basic> getAllCourses() {
        UserData currentUser = userDataService.getCurrentUserData();
        return courseRepository.findByCreatedByUserId(currentUser.id())
                               .stream()
                               .map(courseMapper::toBasic)
                               .toList();
    }



    private void validateCourseRequest(CourseRequest.Create request, Long userId) {
        if (courseRepository.existsByNameAndCreatedByUserId(request.courseName(), userId)) {
            throw new DuplicatedCourseException(request.courseName());
        }
    }


}
