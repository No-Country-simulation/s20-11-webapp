package no.country.eduplanner.courses.infra.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.service.CourseScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;
import java.util.SortedMap;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseScheduleController {

    private final CourseScheduleService courseService;

    @PostMapping("/{courseId}/schedule")
    @ResponseStatus(HttpStatus.CREATED)
    public SortedMap<DayOfWeek, List<ScheduleBlockResponse>> createScheduleForCourse(@PathVariable Long courseId) {
        return courseService.createSchedule(courseId);
    }

    @GetMapping("/{courseId}/schedule")
    public SortedMap<DayOfWeek, List<ScheduleBlockResponse>> getCurrentScheduleForCourse(@PathVariable Long courseId) {
        return courseService.getSchedule(courseId);
    }


}
