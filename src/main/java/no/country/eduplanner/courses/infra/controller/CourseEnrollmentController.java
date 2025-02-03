package no.country.eduplanner.courses.infra.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.courses.application.dto.CourseRequest;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.service.CourseEnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseEnrollmentController {

    private final CourseEnrollmentService courseService;

    @GetMapping("/for-current-student")
    public CourseResponse.Detailed getCourseForCurrentStudent(){
        return courseService.getCourseForCurrentStudent();
    }

    @PostMapping("/{courseId}/students")
    public void registerStudentForCourse(@PathVariable Long courseId,
                                         @RequestBody @Valid CourseRequest.RegisterStudent studentRequest) {

        courseService.registerStudentForCourse(courseId, studentRequest);
    }


    @GetMapping("/{courseId}/students")
    public List<UserData> getAllStudentsForCourse(@PathVariable Long courseId) {
        return courseService.getAllStudentsForCourse(courseId);
    }

}
