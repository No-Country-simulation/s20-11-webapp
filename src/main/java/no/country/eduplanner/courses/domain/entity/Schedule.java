package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.vo.TimeRange;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "schedules")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Getter
@Setter
@ToString
public class Schedule extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Set<ScheduleBlock> blocks = new HashSet<>();

    public Schedule(Course course) {
        this.course = course;
    }


    public void addClassBlock(Subject subject, DayOfWeek day, LocalTime startTime) {
        validateDay(day);
        validateStartTime(startTime, day);
        validateNotDuringLunch(startTime);

        TimeRange blockTime = TimeRange.of(startTime, startTime.plus(course.getBlockDuration()));
        blocks.add(new ScheduleBlock(this, subject, blockTime, day));

        //Agregar receso automáticamente si queda tiempo? TODO: test this
        LocalTime breakStart = blockTime.endTime();
        if (shouldAddBreak(breakStart)) {
            addBreakBlock(breakStart, day);
        }
    }

    public void initializeLunchBlock() {
        if (course.getLunchBreak() != null) {
            course.getClassDays().forEach(day ->
                    blocks.add(new ScheduleBlock(
                            this,
                            Subject.createBreak("Lunch"),
                            course.getLunchBreak(),
                            day
                    ))
            );
        }
    }

    private void validateDay(DayOfWeek day) {
        if (!course.getClassDays().contains(day)) {
            throw new IllegalArgumentException("Cannot schedule on non-class day: " + day);
        }
    }

    private void validateNotDuringLunch(LocalTime startTime) {
        TimeRange proposedTime = new TimeRange(
                startTime,
                startTime.plus(course.getBlockDuration())
        );

        if (course.getLunchBreak() != null &&
            proposedTime.overlaps(course.getLunchBreak())) {
            throw new IllegalArgumentException("Block overlaps with lunch break");
        }
    }

    private void validateStartTime(LocalTime startTime, DayOfWeek day) {
        if (startTime.isBefore(course.getTimeRange().startTime()) ||
            startTime.plus(course.getBlockDuration()).isAfter(course.getTimeRange().endTime())) {
            throw new IllegalArgumentException("Block time must be within course time range"); //TODO: Custom exception
        }

        // Check si 'choca' con otros bloques en el mismo horario
        for (ScheduleBlock block : blocks) {
            if (block.getDayOfWeek() == day &&
                block.getTimeRange().overlaps(TimeRange.of(startTime,
                        startTime.plus(course.getBlockDuration())))) {
                throw new IllegalArgumentException("Block time overlaps with " +
                                                   block.getSubject().getName() + " on " + day);
            }
        }
    }

    private boolean shouldAddBreak(LocalTime breakStart) {
        TimeRange proposedBreak = TimeRange.of(breakStart, breakStart.plus(course.getBreakDuration()));

        if (course.getLunchBreak() != null && proposedBreak.overlaps(course.getLunchBreak())) {
            return false;
        }

        return !proposedBreak.endTime().isAfter(course.getTimeRange().endTime());
    }

    private void addBreakBlock(LocalTime breakStart, DayOfWeek day) {
        TimeRange breakTime = TimeRange.of(breakStart, breakStart.plus(course.getBreakDuration()));
        blocks.add(new ScheduleBlock(this, Subject.createBreak("Break"), breakTime, day));
    }

    private void validateTimeRange(TimeRange timeRange) {
        if (timeRange.startTime().isBefore(course.getTimeRange().startTime()) ||
            timeRange.endTime().isAfter(course.getTimeRange().endTime())) {
            throw new IllegalArgumentException("Block time must be within course time range");
        }
    }

    public List<ScheduleBlock> getBlocksByDay(DayOfWeek day) {
        return blocks.stream()
                     .filter(block ->block.getDayOfWeek() == day)
                     .sorted(Comparator.comparing(block -> block.getTimeRange().startTime()))
                     .toList();

    }

    public Map<DayOfWeek, List<ScheduleBlock>> getAllBlocksByDay() {
        return course.getClassDays().stream()
                     .collect(Collectors.toMap(
                             day -> day,
                             this::getBlocksByDay,
                             (existing, replacement) -> existing,
                             () -> new EnumMap<>(DayOfWeek.class)
                     ));
    }
}
