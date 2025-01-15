package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.vo.TimeRange;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.DayOfWeek;
import java.util.StringJoiner;

@Entity
@Table(name = "schedule_blocks")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class ScheduleBlock extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Embedded
    private TimeRange timeRange;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DayOfWeek dayOfWeek;


    @Override
    public String toString() {
        return "• %s (%s) from %s to %s"
                .formatted(subject.getName(), subject.getType().name(), timeRange.startTime(), timeRange.endTime());
    }
}
