package no.country.eduplanner.notification.persistence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import no.country.eduplanner.course.persitence.entities.CourseEntity;
import no.country.eduplanner.events.persistence.entities.EventEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notifications")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;
}

