package no.country.eduplanner.courses.application.dto;


public sealed interface ScheduleBlockRequest {
    record Update (
            Long blockId,
            Long subjectId
    ) implements ScheduleBlockRequest {}
    record RemoveSubject (
            Long blockId
    ) implements ScheduleBlockRequest {}
}
