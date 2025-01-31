package no.country.eduplanner.courses.application.api;

import java.util.List;

public interface CourseInfoPort {

    List<Long> getAllCourseIdsAssociatedWithCurrentUser();

}
