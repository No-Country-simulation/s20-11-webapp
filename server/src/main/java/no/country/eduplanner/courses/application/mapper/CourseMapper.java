package no.country.eduplanner.courses.application.mapper;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.CourseResponse;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.dto.SubjectResponse;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.ScheduleBlock;
import no.country.eduplanner.courses.domain.entity.Subject;
import no.country.eduplanner.courses.infra.persistence.ScheduleBlockRepository;
import no.country.eduplanner.shared.application.dto.AuditInfo;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CourseMapper {

    private final ScheduleBlockRepository scheduleBlockRepository;

    public CourseResponse.Created toCreated(Course course) {
        return new CourseResponse.Created(
                course.getId(),
                AuditInfo.fromBaseEntity(course)
        );
    }

    public CourseResponse.Detailed toDetailed(Course course) {
        return new CourseResponse.Detailed(
                course.getId(),
                course.getName(),
                course.getClassStartTime(),
                course.getBlocksBeforeLunch(),
                course.getBlocksAfterLunch(),
                course.getTotalBlocksPerDay(),
                course.getClassDays(),
                course.getBlockDuration().toMinutes(),
                course.getBreakDuration().toMinutes(),
                course.getLunchDuration().toMinutes(),
                course.getTotalStudents(),
                AuditInfo.fromBaseEntity(course)

        );
    }

    public CourseResponse.Basic toBasic(Course course) {
        return new CourseResponse.Basic(
                course.getId(),
                course.getName(),
                course.getTotalStudents(),
                AuditInfo.fromBaseEntity(course)
        );
    }

    public ScheduleBlockResponse toScheduleBlockResponse(ScheduleBlock scheduleBlock) {
        return new ScheduleBlockResponse(
                scheduleBlock.getId(),
                scheduleBlock.getOrderNumber(),
                scheduleBlock.getTimeRange(),
                scheduleBlock.getType(),
                scheduleBlock.getSubject() != null ?
                        toSubjectResponse(scheduleBlock.getSubject())
                        : null
        );
    }

    public SubjectResponse toSubjectResponse(Subject subject) {

        Long assignedTimeInSeconds = scheduleBlockRepository.getTotalDurationInSecondsBySubjectId(subject.getId());

        return new SubjectResponse(
                subject.getId(),
                subject.getName(),
                subject.getTeacherName(),
                assignedTimeInSeconds,
                subject.getColor()
        );
    }

}
