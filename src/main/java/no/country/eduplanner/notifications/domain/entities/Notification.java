package no.country.eduplanner.notifications.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;
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

    public void markAsExpired() {
        this.isExpired = true;
    }
}
