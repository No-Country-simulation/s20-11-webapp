package no.country.eduplanner.courses;

import no.country.eduplanner.courses.domain.entity.Course;
import no.country.eduplanner.courses.domain.entity.Schedule;
import no.country.eduplanner.courses.domain.entity.Subject;
import no.country.eduplanner.courses.domain.enums.SubjectType;
import no.country.eduplanner.courses.domain.vo.TimeRange;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Set;

public class testingMain {
    public static void main(String[] args) {

        Course course = Course.builder()
                              .name("Tercero B")
                              .timeRange(TimeRange.of(LocalTime.of(8, 0), LocalTime.of(16, 30)))
                              .classDays(Set.of(
                                      DayOfWeek.MONDAY, DayOfWeek.THURSDAY, DayOfWeek.WEDNESDAY
                              ))
                              .blockDuration(Duration.ofMinutes(90))
                              .breakDuration(Duration.ofMinutes(15))
                              .lunchBreak(TimeRange.of(LocalTime.of(12, 0), LocalTime.of(13, 0)))
                              .build();



        Schedule schedule = new Schedule(course);
        schedule.initializeLunchBlock();

        course.setSchedule(schedule);
        Subject math = Subject.createClass("Matemáticas", "#FFB6C1");
        Subject lang = Subject.createClass("Lenguaje", "#BFB6C1");
        Subject science = Subject.createClass("Ciencias", "#AFB6C1");
        Subject history = Subject.createClass("Historia", "#DFB6C1");

        schedule.addClassBlock(math,DayOfWeek.MONDAY, LocalTime.of(8, 0));
        schedule.addClassBlock(history,DayOfWeek.THURSDAY, LocalTime.of(9, 45));//Need to be inclusive
        schedule.addClassBlock(lang,DayOfWeek.MONDAY, LocalTime.of(10, 0));
        schedule.addClassBlock(science,DayOfWeek.MONDAY, LocalTime.of(13, 0));

//        System.out.println(course);
//        System.out.println(schedule);

        schedule.getBlocksByDay(DayOfWeek.MONDAY).forEach(System.out::println);

        System.out.println(schedule.getAllBlocksByDay());
    }
}
