package no.country.eduplanner.courses.infra.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.service.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.DayOfWeek;
import java.util.List;
import java.util.SortedMap;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseResponse.Created> createCourse(@RequestBody CourseRequest.Create request) {

        CourseResponse.Created createdCourse = courseService.createCourse(request);

        return ResponseEntity.created(URI.create("/courses" + createdCourse.id()))
                             .body(createdCourse);
    }

    @GetMapping("/{courseId}")
    public CourseResponse.Detailed getCourseDetails(@PathVariable Long courseId) {
        return courseService.getCourseDetailsById(courseId);
    }

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
