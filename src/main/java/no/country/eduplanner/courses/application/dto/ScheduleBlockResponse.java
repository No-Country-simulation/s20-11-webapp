package no.country.eduplanner.courses.application.dto;

import no.country.eduplanner.courses.domain.enums.BlockType;
import no.country.eduplanner.courses.domain.vo.TimeRange;

public record ScheduleBlockResponse(
        Long id,
        Integer orderNumber,
        TimeRange timeRange,
        BlockType type,
        SubjectResponse subject
) {
}
