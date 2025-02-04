package no.country.eduplanner.courses.application.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.courses.application.dto.*;
import no.country.eduplanner.courses.application.exception.DuplicatedSubjectException;
import no.country.eduplanner.courses.application.exception.InvalidSubjectAssignmentException;
import no.country.eduplanner.courses.application.exception.ScheduleBlockNotFoundException;
import no.country.eduplanner.courses.application.exception.SubjectNotFoundException;
import no.country.eduplanner.courses.application.mapper.CourseMapper;
import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.ScheduleBlock;
import no.country.eduplanner.courses.domain.entity.Subject;
import no.country.eduplanner.courses.domain.enums.SubjectType;
import no.country.eduplanner.courses.infra.persistence.ScheduleBlockRepository;
import no.country.eduplanner.courses.infra.persistence.SubjectRepository;
import no.country.eduplanner.notifications.domain.enums.NotificationType;
import no.country.eduplanner.shared.application.dto.NotificationRequest;
import no.country.eduplanner.shared.application.utils.ColorUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CourseAccessService courseAccessService;
    private final ScheduleBlockRepository scheduleBlockRepository;
    private final CourseMapper mapper;
    private final ColorUtils colorUtils;
    private final ApplicationEventPublisher eventPublisher;


    public void updateSubject(SubjectUpdateRequest request) {
        Subject subject = subjectRepository.findById(request.subjectId())
                                           .orElseThrow(() -> new SubjectNotFoundException(request.subjectId()));


        boolean isSameSubject = subject.getName().equals(request.subjectName());

        if (!isSameSubject && subjectRepository.existsByNameAndCourseId(request.subjectName(), subject.getCourse().getId())) {
            throw new DuplicatedSubjectException(request.subjectName());
        }


        subject.setName(request.subjectName());
        subject.setTeacherName(request.teacherName() != null ? request.teacherName() : null);
        subject.setColor(colorUtils.createAdaptableColor(request.color()));

        subjectRepository.save(subject);

    }


    public SubjectResponse createClassSubjectForCourse(SubjectRequest request, Long courseId) {

        Course course = courseAccessService.getCourseWithAccessCheck(courseId);

        validateSubjectRequest(request, courseId);

        Subject newSubject = Subject.builder()
                                    .name(request.name())
                                    .color(colorUtils.createAdaptableColor())
                                    .type(SubjectType.CLASS)
                                    .course(course)
                                    .build();

        return mapper.toSubjectResponse(subjectRepository.save(newSubject));
    }

    public ScheduleBlockResponse updateSubjectForBlock(ScheduleBlockRequest.Update request, Long courseId) {
        ScheduleBlock scheduleBlock = scheduleBlockRepository.findById(request.blockId())
                                                             .orElseThrow(() -> new ScheduleBlockNotFoundException(request.blockId()));

        courseAccessService.getCourseWithAccessCheck(scheduleBlock.getSchedule().getCourse().getId());

        Subject subject = subjectRepository.findById(request.subjectId())
                                           .orElseThrow(() -> new SubjectNotFoundException(request.subjectId()));

        if (!courseId.equals(subject.getCourse().getId())) { //TODO: CHECK FOR LAZY INIT
            throw new InvalidSubjectAssignmentException();
        }

        scheduleBlock.updateSubjectForBlock(subject);

//        eventPublisher.publishEvent(buildSubjectUpdatedNotificationRequest(courseId, subject, scheduleBlock));


        return mapper.toScheduleBlockResponse(scheduleBlockRepository.save(scheduleBlock));
    }

    public List<SubjectResponse> getAllSubjectsForCourse(Long courseId) {
        courseAccessService.getCourseWithAccessCheck(courseId);

        return subjectRepository.findAllByCourseId(courseId).stream()
                                .map(mapper::toSubjectResponse)
                                .toList();
    }

    public ScheduleBlockResponse removeSubjectFromBlock(ScheduleBlockRequest.RemoveSubject request, Long courseId) {
        ScheduleBlock scheduleBlock = scheduleBlockRepository.findById(request.blockId())
                                                             .orElseThrow(() -> new ScheduleBlockNotFoundException(request.blockId()));

        courseAccessService.getCourseWithAccessCheck(courseId);

        scheduleBlock.updateSubjectForBlock(null);
        return mapper.toScheduleBlockResponse(scheduleBlockRepository.save(scheduleBlock));
    }

    public void publishNotificationForSubject(@Valid SubjectNotificationRequest request) { //This should take a SubjectNotificationRequest/ no type no color required


        log.info("🔔 Attempting to publish notification for subject with id: {}", request.subjectId());

        Subject subject = subjectRepository.findById(request.subjectId())
                                           .orElseThrow(() -> new SubjectNotFoundException(request.subjectId()));

        eventPublisher.publishEvent(NotificationRequest.builder()
                                                       .header(subject.getName())
                                                       .title(request.title())
                                                       .message(request.message())
                                                       .courseId(request.courseId())
                                                       .subjectId(request.subjectId())
                                                       .scheduledFor(request.scheduledFor())
                                                       .assignedColor(subject.getColor())
                                                       .type(NotificationType.FOR_SUBJECT)
                                                       .build());

    }

    private static NotificationRequest buildSubjectUpdatedNotificationRequest(Long courseId, Subject subject, ScheduleBlock scheduleBlock) {
        return NotificationRequest.builder()
                                  .title("Horario de materia actualizado")
                                  .message("La materia %s ha sido asignada al bloque de las [%s]hrs. del dia %s"
                                          .formatted(
                                                  subject.getName(),
                                                  scheduleBlock.getTimeRange().startTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                                                  StringUtils.capitalize(scheduleBlock.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.of("es"))))

                                  ).scheduledFor(LocalDateTime.now())
                                  .courseId(courseId)
                                  .subjectId(subject.getId())
                                  .assignedColor(subject.getColor())
                                  .build();

    }

    private void validateSubjectRequest(SubjectRequest request, Long courseId) {

        if (subjectRepository.existsByNameAndCourseId(request.name(), courseId)) {
            throw new DuplicatedSubjectException(request.name());
        }
    }


}
