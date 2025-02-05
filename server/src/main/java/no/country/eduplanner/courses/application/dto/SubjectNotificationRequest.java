package no.country.eduplanner.courses.application.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record SubjectNotificationRequest(

        @NotBlank
        String title,
        @NotBlank
        String message,
        @NotNull
        Long courseId,
        @NotNull
        Long subjectId,
        @Future
        LocalDateTime scheduledFor
) {
}
