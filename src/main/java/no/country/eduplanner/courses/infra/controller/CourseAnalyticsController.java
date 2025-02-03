package no.country.eduplanner.courses.infra.controller;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.CourseStats;
import no.country.eduplanner.courses.application.service.CourseInfoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses/analytics")
@RequiredArgsConstructor
public class CourseAnalyticsController {

    private final CourseInfoService courseInfoService;

    @GetMapping("/stats")
    public CourseStats getCourseStats() {
        return courseInfoService.getCourseStats();
    }
}
