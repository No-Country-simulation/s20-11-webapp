package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.enums.BlockType;
import no.country.eduplanner.courses.domain.vo.TimeRange;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "schedules")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Getter
@Setter
public class Schedule extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ScheduleBlock> blocks = new HashSet<>();

    public Schedule(Course course) {
        this.course = course;
    }

    public void initializeSchedule() {
        if (!blocks.isEmpty()) {
            throw new IllegalStateException("Schedule is already initialized");
        }

        course.getClassDays().forEach(this::initializeDayBlocks);
    }

    public Map<DayOfWeek, List<ScheduleBlock>> getAllBlocksByDay() {
        return blocks.stream()
                     .collect(Collectors.groupingBy(
                             ScheduleBlock::getDayOfWeek,
                             TreeMap::new,
                             Collectors.collectingAndThen(
                                     Collectors.toList(),
                                     list -> {
                                         list.sort(Comparator.comparing(block ->
                                                 block.getTimeRange().startTime()));
                                         return list;
                                     }
                             )
                     ));
    }

    public List<ScheduleBlock> getBlocksForDay(DayOfWeek day) {
        return blocks.stream()
                     .filter(block -> block.getDayOfWeek() == day)
                     .sorted(Comparator.comparing(block -> block.getTimeRange().startTime()))
                     .toList();
    }

    @Override
    public String toString() {
        if (blocks.isEmpty()) {
            return "Schedule not initialized";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("Schedule for Course: ").append(course.getName()).append("\n");

        Map<DayOfWeek, List<ScheduleBlock>> blocksByDay = getAllBlocksByDay();

        blocksByDay.forEach((day, dayBlocks) -> {
            sb.append("\n").append(day).append(":\n");
            dayBlocks.forEach(block -> {
                sb.append("  • ")
                  .append(String.format("%-6s", block.getType()))
                  .append(" | ")
                  .append(formatTimeRange(block.getTimeRange()))
                  .append(" | ");

                if (block.getSubject() != null) {
                    sb.append(block.getSubject().getName());
                } else if (block.getType() == BlockType.CLASS) {
                    sb.append("(Sin materia asignada)");
                }

                sb.append("\n");
            });
        });

        return sb.toString();
    }

    private void initializeDayBlocks(DayOfWeek day) {
        // Morning
        LocalTime currentTime = course.getClassStartTime();
        currentTime = addBlocks(day, currentTime, course.getBlocksBeforeLunch());

        // Lunch
        LocalTime lunchEnd = currentTime.plus(course.getLunchDuration());
        int lunchOrderNumber = getNextOrderNumber(day);

        blocks.add(ScheduleBlock.builder()
                                .schedule(this)
                                .timeRange(TimeRange.of(currentTime, lunchEnd))
                                .dayOfWeek(day)
                                .type(BlockType.LUNCH)
                                .orderNumber(lunchOrderNumber)
                                .build());

        //Afternoon
        currentTime = lunchEnd;
        addBlocks(day, currentTime, course.getBlocksAfterLunch());

    }

    private LocalTime addBlocks(DayOfWeek day, LocalTime startTime, int blockCount) {
        LocalTime currentTime = startTime;
        int orderNumber = getNextOrderNumber(day);

        for (int i = 0; i < blockCount; i++) {
            // Add class block
            TimeRange classRange = TimeRange.of(
                    currentTime,
                    currentTime.plus(course.getBlockDuration())
            );

            blocks.add(ScheduleBlock.builder()
                                    .schedule(this)
                                    .timeRange(classRange)
                                    .dayOfWeek(day)
                                    .type(BlockType.CLASS)
                                    .orderNumber(orderNumber++)
                                    .build());

            currentTime = classRange.endTime();

            // Add break if not last block and not before lunch
            boolean isLastMorningBlock = i == blockCount - 1;
            if (!isLastMorningBlock) {
                TimeRange breakRange = TimeRange.of(
                        currentTime,
                        currentTime.plus(course.getBreakDuration())
                );

                blocks.add(ScheduleBlock.builder()
                                        .schedule(this)
                                        .timeRange(breakRange)
                                        .dayOfWeek(day)
                                        .type(BlockType.BREAK)
                                        .orderNumber(orderNumber++)
                                        .build());

                currentTime = breakRange.endTime();
            }
        }

        return currentTime;
    }

    private int getNextOrderNumber(DayOfWeek day) {
        return blocks.stream()
                     .filter(block -> block.getDayOfWeek() == day)
                     .map(ScheduleBlock::getOrderNumber)
                     .max(Integer::compareTo)
                     .orElse(0) + 1;
    }

    private String formatTimeRange(TimeRange range) {
        return String.format("%s-%s",
                range.startTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                range.endTime().format(DateTimeFormatter.ofPattern("HH:mm"))
        );
    }
}
