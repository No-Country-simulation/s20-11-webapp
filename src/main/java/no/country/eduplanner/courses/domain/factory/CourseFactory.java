package no.country.eduplanner.courses.domain.factory;

import no.country.eduplanner.courses.domain.entity.Course;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.Set;

@Component
public class CourseFactory {

    public Course createDefault(String name) {

        return Course.builder()
                     .name(name)
                     .classStartTime(LocalTime.of(8, 30))
                     .blocksBeforeLunch(3)
                     .blocksAfterLunch(2)
                     .classDays(Set.of(
                             DayOfWeek.MONDAY,
                             DayOfWeek.TUESDAY,
                             DayOfWeek.WEDNESDAY,
                             DayOfWeek.THURSDAY,
                             DayOfWeek.FRIDAY
                     ))
                     .blockDuration(Duration.ofMinutes(90))
                     .breakDuration(Duration.ofMinutes(15))
                     .lunchDuration(Duration.ofMinutes(60))
                     .build();

    }

}
