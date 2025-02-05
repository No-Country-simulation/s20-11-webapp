package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.services.UserDataService;
import no.country.eduplanner.courses.application.api.CourseInfoPort;
import no.country.eduplanner.courses.application.dto.CourseStats;
import no.country.eduplanner.courses.infra.persistence.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CourseInfoService implements CourseInfoPort {

    private final CourseRepository courseRepository;
    private final UserDataService userDataService;

    public CourseStats getCourseStats() {
        long totalStudents = getTotalStudentsForCurrentUser();
        return new CourseStats(totalStudents);
    }

    @Override
    public List<Long> getAllCourseIdsAssociatedWithCurrentUser() {
        UserData currentUserData = userDataService.getCurrentUserData();
        return courseRepository.findCourseIdsByCreatedByUserId(currentUserData.id());
    }

    private long getTotalStudentsForCurrentUser() {
        UserData currentUser = userDataService.getCurrentUserData();
        return courseRepository.countStudentsInAllCoursesCreatedBy(currentUser.id());
    }
}
