package no.country.eduplanner.events.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import no.country.eduplanner.notification.domain.entities.NotificationEntity;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class EventEntity extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "curso_id", nullable = false)
    private Long courseId;

    @Column(name = "subject_id", nullable = false)
    private Long subjectId;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NotificationEntity> notifications = new ArrayList<>();
}
