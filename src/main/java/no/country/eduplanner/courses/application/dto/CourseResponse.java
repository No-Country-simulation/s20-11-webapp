package no.country.eduplanner.courses.application.dto;

import no.country.eduplanner.shared.application.dto.AuditInfo;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

public sealed interface CourseResponse {
    record Created(
            Long id,
            AuditInfo auditInfo

    ) implements CourseResponse {
    }

    record Detailed(
            Long id,
            String name,
            LocalTime classStartTime,
            int blocksBeforeLunch,
            int blocksAfterLunch,
            int totalBlocksPerDay,
            Set<DayOfWeek> classDays,
            Long blockDurationInMinutes,
            Long breakDurationInMinutes,
            Long lunchDurationInMinutes,
            AuditInfo auditInfo
    ) implements CourseResponse {
    }

}
