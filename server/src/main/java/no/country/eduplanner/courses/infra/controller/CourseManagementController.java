package no.country.eduplanner.courses.infra.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.service.CourseManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseManagementController {

    private final CourseManagementService courseService;

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

}
