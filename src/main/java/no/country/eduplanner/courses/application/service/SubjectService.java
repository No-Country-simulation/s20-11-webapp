package no.country.eduplanner.courses.application.service;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.ScheduleBlockRequest;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.dto.SubjectRequest;
import no.country.eduplanner.courses.application.dto.SubjectResponse;
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
import no.country.eduplanner.shared.application.events.NotificationEvent;
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


    public SubjectResponse createClassSubjectForCourse(SubjectRequest request, Long courseId) {

        Course course = courseAccessService.getCourseWithAccessCheck(courseId);

        validateSubjectRequest(request, courseId);

        Subject newSubject = new Subject(request.name(), colorUtils.generateHexColor(), SubjectType.CLASS, course);

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

        eventPublisher.publishEvent(new NotificationEvent(
                "La materia %s ha sido asignada al bloque de las [%s]hrs. del dia %s".formatted(
                        subject.getName(),
                        scheduleBlock.getTimeRange().startTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                        StringUtils.capitalize(scheduleBlock.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.of("es")))
                ), LocalDateTime.now()));

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

    private void validateSubjectRequest(SubjectRequest request, Long courseId) {

        if (subjectRepository.existsByNameAndCourseId(request.name(), courseId)) {
            throw new DuplicatedSubjectException(request.name());
        }
    }


}
