package no.country.eduplanner.courses.infra.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.service.CourseService;
import no.country.eduplanner.courses.infra.controller.apidocs.CourseApi;
import no.country.eduplanner.students.StudentRequest;
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
public class CourseController implements CourseApi {

    private final CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseResponse.Created> createCourse(@RequestBody @Valid CourseRequest.Create request) {

        CourseResponse.Created createdCourse = courseService.createCourse(request);

        return ResponseEntity.created(URI.create("/courses" + createdCourse.id()))
                             .body(createdCourse);
    }

    @GetMapping
    public List<CourseResponse.Basic> getAllCourses() {
        return courseService.getAllCourses();
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

    @PostMapping("/{courseId}/students")
    public void registerStudentForCourse(@PathVariable Long courseId,
                                       @RequestBody @Valid StudentRequest studentRequest) {

        courseService.registerStudentForCourse(courseId, studentRequest);
    }

}
