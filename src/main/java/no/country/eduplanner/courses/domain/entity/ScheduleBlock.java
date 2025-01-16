package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.application.exception.InvalidSubjectForTypeException;
import no.country.eduplanner.courses.domain.enums.BlockType;
import no.country.eduplanner.courses.domain.vo.TimeRange;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.DayOfWeek;

@Entity
@Table(name = "schedule_blocks")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
public class ScheduleBlock extends BaseEntity {

    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "subject_id") // CAN BE NULL FOR FREE BLOCKS??
    private Subject subject;

    @Embedded
    private TimeRange timeRange;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DayOfWeek dayOfWeek;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private BlockType type;


    @Override
    public String toString() {
        return "• %s (%s) from %s to %s"
                .formatted(subject.getName(), subject.getType().name(), timeRange.startTime(), timeRange.endTime());
    }

    public void updateSubjectForBlock(Subject subject) {
        if (this.type == BlockType.BREAK) {
            throw new InvalidSubjectForTypeException();
        }
        this.subject = subject;

    }
}
