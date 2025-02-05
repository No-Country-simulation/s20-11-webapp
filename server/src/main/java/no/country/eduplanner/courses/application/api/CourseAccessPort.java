package no.country.eduplanner.courses.application.api;

public interface CourseAccessPort {

    void verifyUserHasAccessToCourse(Long courseId);

}
