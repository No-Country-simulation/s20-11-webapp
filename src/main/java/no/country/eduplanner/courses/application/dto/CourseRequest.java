package no.country.eduplanner.courses.application.dto;

public sealed interface CourseRequest {
    record Create(
            String courseName
    ) implements CourseRequest {
    }

    public record CreateSchedule() {

    }
}
