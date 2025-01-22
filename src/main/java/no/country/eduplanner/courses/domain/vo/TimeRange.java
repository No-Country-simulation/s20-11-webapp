package no.country.eduplanner.courses.domain.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.time.Duration;
import java.time.LocalTime;


@Embeddable
public record TimeRange(

        @Column(name = "start_time", nullable = false)
        LocalTime startTime,

        @Column(name = "end_time", nullable = false)
        LocalTime endTime

) {

    public TimeRange {
        if (startTime != null && endTime != null && startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
    }

    public static TimeRange of(LocalTime startTime, LocalTime endTime) {
        return new TimeRange(startTime, endTime);
    }

    public boolean overlaps(TimeRange other) {
        return this.startTime.isBefore(other.endTime()) &&
               other.startTime().isBefore(this.endTime);
    }

    @JsonIgnore
    public Duration getDuration() {
        return Duration.between(startTime, endTime);
    }
}



