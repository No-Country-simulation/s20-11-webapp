package no.country.eduplanner.courses.persitence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import no.country.eduplanner.auth.persistence.entity.UserEntity;
import no.country.eduplanner.notification.persistence.entities.NotificationEntity;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "students")
public class StudentEntity extends UserEntity {

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseEntity course;

    //@OneToMany(mappedBy = "course_id", cascade = CascadeType.ALL, orphanRemoval = true) Hay que rever el sistema de notificaciones
    private List<NotificationEntity> notifications = new ArrayList<>();
}
