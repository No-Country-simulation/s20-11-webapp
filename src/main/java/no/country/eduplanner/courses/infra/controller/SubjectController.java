package no.country.eduplanner.courses.infra.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.dto.ScheduleBlockRequest;
import no.country.eduplanner.courses.application.dto.ScheduleBlockResponse;
import no.country.eduplanner.courses.application.dto.SubjectRequest;
import no.country.eduplanner.courses.application.dto.SubjectResponse;
import no.country.eduplanner.courses.application.service.SubjectService;
import no.country.eduplanner.shared.application.dto.NotificationRequest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/{courseId}/subjects")
    public ResponseEntity<SubjectResponse> createSubjectForCourse(@RequestBody SubjectRequest request,
                                                                  @PathVariable Long courseId) {

        SubjectResponse subject = subjectService.createClassSubjectForCourse(request, courseId);

        return ResponseEntity.created(URI.create("/courses/%d/subjects/%d"
                                     .formatted(courseId, subject.id())))
                             .body(subject);

    }

    @PostMapping("/send-notification")
    public void publishNotificationForSubject(@RequestBody @Valid NotificationRequest request) {
        eventPublisher.publishEvent(request);
    }

    @PutMapping("/{courseId}/subjects/add-to-block")
    public ScheduleBlockResponse updateSubjectForBlock(@RequestBody ScheduleBlockRequest.Update request,
                                                       @PathVariable Long courseId) {
        return subjectService.updateSubjectForBlock(request, courseId);
    }

    @GetMapping("/{courseId}/subjects")
    public Iterable<SubjectResponse> getAllSubjectsForCourse(@PathVariable Long courseId) {
        return subjectService.getAllSubjectsForCourse(courseId);
    }

    @DeleteMapping("/{courseId}/subjects/remove-from-block")
    public ScheduleBlockResponse removeSubjectFromBlock(@PathVariable Long courseId,
                                                        @RequestBody ScheduleBlockRequest.RemoveSubject request) {
        return subjectService.removeSubjectFromBlock(request, courseId);
    }


}
