package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.HashSet;
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

    @Column(name = "class_start_time", nullable = false)
    private LocalTime classStartTime;

    @Column(name = "blocks_before_lunch", nullable = false)
    private Integer blocksBeforeLunch;

    @Column(name = "blocks_after_lunch", nullable = false)
    private Integer blocksAfterLunch;

    @Column(name = "block_duration", nullable = false)
    private Duration blockDuration;

    @Column(name = "break_duration", nullable = false)
    private Duration breakDuration;

    @Column(name = "lunch_duration", nullable = false)
    private Duration lunchDuration;

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

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @Builder.Default
    private Set<Subject> subjects = new HashSet<>();

    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
        schedule.setCourse(this);
    }

    public Integer getTotalBlocksPerDay() {
        return blocksBeforeLunch + blocksAfterLunch;
    }

    //Move this to @Validations?????????????????????
    public void validateScheduleConfiguration() {
        if (classStartTime == null) {
            throw new IllegalStateException("Class start time must be set");
        }
        if (blocksBeforeLunch == null || blocksBeforeLunch < 0) {
            throw new IllegalStateException("Invalid blocks before lunch");
        }
        if (blocksAfterLunch == null || blocksAfterLunch < 0) {
            throw new IllegalStateException("Invalid blocks after lunch");
        }
        if (blockDuration == null || blockDuration.isNegative() || blockDuration.isZero()) {
            throw new IllegalStateException("Invalid block duration");
        }
        if (breakDuration == null || breakDuration.isNegative() || breakDuration.isZero()) {
            throw new IllegalStateException("Invalid break duration");
        }
        if (lunchDuration == null || lunchDuration.isNegative() || lunchDuration.isZero()) {
            throw new IllegalStateException("Invalid lunch duration");
        }
        if (classDays == null || classDays.isEmpty()) {
            throw new IllegalStateException("No class days defined");
        }
    }
}

