package no.country.eduplanner.notification.application.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {

    private Long id;
    private String message;
    private Long eventId;
    private Long courseId;
}

