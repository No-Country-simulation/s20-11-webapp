package no.country.eduplanner.notification.persistence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import no.country.eduplanner.events.persistence.entities.EventEntity;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notifications")
public class NotificationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mensaje;

    private boolean leido = false;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;

}
