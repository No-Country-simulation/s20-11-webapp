package no.country.eduplanner.shared.application.dto;

import lombok.Builder;
import no.country.eduplanner.shared.domain.vo.AdaptableColor;

import java.time.LocalDateTime;

@Builder
public record NotificationRequest(
        String title,
        String message,
        Long courseId,
        Long subjectId,
        LocalDateTime scheduledFor,
        AdaptableColor assignedColor
) {

}
