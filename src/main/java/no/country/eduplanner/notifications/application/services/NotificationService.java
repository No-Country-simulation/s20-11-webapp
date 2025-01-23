package no.country.eduplanner.notifications.application.services;


import lombok.RequiredArgsConstructor;
import no.country.eduplanner.courses.application.api.CourseAccessPort;
import no.country.eduplanner.shared.application.dto.NotificationRequest;
import no.country.eduplanner.notifications.application.dto.NotificationResponse;
import no.country.eduplanner.notifications.application.mapper.NotificationMapper;
import no.country.eduplanner.notifications.domain.entities.Notification;
import no.country.eduplanner.notifications.infra.persistence.NotificationRepository;
import org.springframework.modulith.events.ApplicationModuleListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final CourseAccessPort courseAccessPort;

    @ApplicationModuleListener
    public void handleNotificationCreation(NotificationRequest event) {

        courseAccessPort.verifyUserHasAccessToCourse(event.courseId());

        Notification notification = Notification.builder()
                                                .title(event.title())
                                                .message(event.message())
                                                .courseId(event.courseId())
                                                .subjectId(event.subjectId())
                                                .scheduledFor(event.scheduledFor())
                                                .assignedColor(event.assignedColor())
                                                .build();

        notificationRepository.save(notification);

    }


    public List<NotificationResponse> getAllNotificationsForCourse(Long courseId) {

        courseAccessPort.verifyUserHasAccessToCourse(courseId);

        return notificationRepository.findAllByCourseIdOrderByScheduledForDesc(courseId)
                                     .stream()
                                     .map(notificationMapper::toResponse)
                                     .toList();

    }

    public NotificationResponse getNotificationById(Long id) {
        Notification notification = notificationRepository.findById(id)
                                                          .orElseThrow(() -> new RuntimeException("Event not found"));

        courseAccessPort.verifyUserHasAccessToCourse(notification.getCourseId());

        return notificationMapper.toResponse(notification);
    }

//    public void deleteEvent(Long id) {
//        notificationRepository.deleteById(id);
//    }
//
//    public boolean exists(Long id) {
//        return notificationRepository.existsById(id);
//    }
}

