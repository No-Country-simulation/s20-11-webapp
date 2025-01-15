package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.vo.TimeRange;
import no.country.eduplanner.shared.domain.base.BaseEntity;
import org.hibernate.proxy.HibernateProxy;

import java.time.DayOfWeek;
import java.time.Duration;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "courses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Getter
@Setter
@ToString
public class Course extends BaseEntity {

    private String name;

    @Embedded
    private TimeRange timeRange;

    @Column(name = "block_duration", nullable = false)
    private Duration blockDuration;

    @Column(name = "break_duration", nullable = false)
    private Duration breakDuration;

    @Embedded
    private TimeRange lunchBreak;

    @ElementCollection
    @CollectionTable(
            name = "course_class_days",
            joinColumns = @JoinColumn(name = "course_id")
    )
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<DayOfWeek> classDays = new HashSet<>();

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Schedule schedule;


    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
        schedule.setCourse(this);
    }

}
