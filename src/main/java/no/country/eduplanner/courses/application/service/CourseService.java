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
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.exception.CourseNotFoundException;
import no.country.eduplanner.courses.application.exception.DuplicatedCourseException;
import no.country.eduplanner.courses.application.mapper.CourseMapper;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.CourseUser;
import no.country.eduplanner.courses.domain.entity.Schedule;
import no.country.eduplanner.courses.domain.entity.ScheduleBlock;
import no.country.eduplanner.courses.domain.factory.CourseFactory;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import no.country.eduplanner.courses.infra.persistence.CourseUserRepository;
import no.country.eduplanner.courses.infra.persistence.ScheduleRepository;
import no.country.eduplanner.shared.application.exception.UnauthorizedAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.Comparator;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CourseService  {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final CourseFactory courseFactory;
    private final ScheduleRepository scheduleRepository;
    private final CourseAccessService courseAccessService;
    private final UserDataService userDataService;
    private final StudentUserRegistrationService studentRegistrationService;
    private final CourseUserRepository courseUserRepository;

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
        initializeSchedule(course);

        return courseMapper.toCreated(course);
    }





    public CourseResponse.Detailed getCourseDetailsById(Long courseId) {
        Course course = courseAccessService.getCourseWithClassDaysAndAccessCheck(courseId);
        return courseMapper.toDetailed(course);
    }

    //TODO: THIS MIGHT BE UNNECESSARY, MAY AS WELL INITIALIZE THE SCHEDULE ON COURSE CREATION.
    public SortedMap<DayOfWeek, List<ScheduleBlockResponse>> createSchedule(Long courseId) {
        Course course = courseAccessService.getCourseWithClassDaysAndAccessCheck(courseId);
        Schedule schedule = initializeSchedule(course);

        return getAllScheduleBlocksByDay(schedule);


    }

    public SortedMap<DayOfWeek, List<ScheduleBlockResponse>> getSchedule(Long courseId) {
        courseAccessService.getCourseWithAccessCheck(courseId);

        Schedule schedule = scheduleRepository.findByCourseId(courseId).orElseThrow(() -> new CourseNotFoundException(courseId));//TODO: THIS IS A SCHEDULE_NOT_INITIALIZED_EXCEPTION
        return getAllScheduleBlocksByDay(schedule);
    }

    public List<CourseResponse.Basic> getAllCourses() {
        UserData currentUser = userDataService.getCurrentUserData();
        return courseRepository.findByCreatedByUserId(currentUser.id())
                               .stream()
                               .map(courseMapper::toBasic)
                               .toList();
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

    private void validateCourseRequest(CourseRequest.Create request, Long userId) {
        if (courseRepository.existsByNameAndCreatedByUserId(request.courseName(), userId)) {
            throw new DuplicatedCourseException(request.courseName());
        }
    }

    private Schedule initializeSchedule(Course course) {
        course.validateScheduleConfiguration();
        Schedule schedule = new Schedule(course);
        schedule.initializeSchedule();

        schedule = scheduleRepository.save(schedule);
        return schedule;
    }

    private SortedMap<DayOfWeek, List<ScheduleBlockResponse>> getAllScheduleBlocksByDay(Schedule schedule) {
        return schedule.getBlocks().stream()
                       .collect(Collectors.groupingBy(
                               ScheduleBlock::getDayOfWeek,
                               TreeMap::new,
                               createSortedBlockResponseCollector()
                       ));
    }

    private Collector<ScheduleBlock, Object, List<ScheduleBlockResponse>> createSortedBlockResponseCollector() {
        return Collectors.collectingAndThen(
                Collectors.mapping(
                        courseMapper::toScheduleBlockResponse,
                        Collectors.toList()
                ),
                list -> {
                    list.sort(Comparator.comparing(ScheduleBlockResponse::orderNumber));
                    return list;
                }
        );
    }
}
