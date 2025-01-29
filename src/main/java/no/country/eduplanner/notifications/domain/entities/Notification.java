package no.country.eduplanner.notifications.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.notifications.domain.enums.NotificationType;
import no.country.eduplanner.shared.domain.base.BaseEntity;
import no.country.eduplanner.shared.domain.vo.AdaptableColor;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@SuperBuilder
@Table(name = "notifications")
public class Notification extends BaseEntity {

    @Column(name = "header")
    private String header;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private LocalDateTime scheduledFor;

    @Column(name = "curso_id", nullable = false)
    private Long courseId;

    @Column(name = "subject_id")
    private Long subjectId;

    @Embedded
    private AdaptableColor assignedColor;

    @Column(name = "is_expired", nullable = false)
    @Builder.Default
    private boolean isExpired = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @Builder.Default
    private NotificationType type = NotificationType.GENERAL;

    public void markAsExpired() {
        this.isExpired = true;
    }
}
