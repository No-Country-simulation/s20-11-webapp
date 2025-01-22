package no.country.eduplanner.events.application.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private Long courseId;
    private Long subjectId;
}
