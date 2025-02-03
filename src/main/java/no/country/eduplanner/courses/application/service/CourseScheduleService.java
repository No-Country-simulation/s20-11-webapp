package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.exception.CourseNotFoundException;
import no.country.eduplanner.courses.application.mapper.CourseMapper;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.Schedule;
import no.country.eduplanner.courses.domain.entity.ScheduleBlock;
import no.country.eduplanner.courses.domain.factory.CourseFactory;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import no.country.eduplanner.courses.infra.persistence.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.util.Comparator;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CourseScheduleService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final CourseFactory courseFactory;
    private final ScheduleRepository scheduleRepository;
    private final CourseAccessService courseAccessService;
    private final UserDataService userDataService;


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

    public Schedule initializeSchedule(Course course) {
        course.validateScheduleConfiguration();
        Schedule schedule = new Schedule(course);
        schedule.initializeSchedule();

        schedule = scheduleRepository.save(schedule);
        return schedule;
    }

}

