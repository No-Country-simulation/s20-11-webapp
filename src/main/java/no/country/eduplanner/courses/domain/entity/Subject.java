package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.enums.SubjectType;
import no.country.eduplanner.shared.domain.base.BaseEntity;

@Entity
@Table(name = "subjects")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@ToString
public class Subject extends BaseEntity {

    public static final String DEFAULT_BREAK_COLOR = "#A0A0A0"; //gray

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "color", nullable = false)
    private String color;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private SubjectType type;


    public static Subject createBreak(String name) {
        Subject subject = new Subject();
        subject.setName(name);
        subject.setColor(DEFAULT_BREAK_COLOR);
        subject.setType(SubjectType.BREAK);
        return subject;

    }

    public static Subject createClass(String name, String color) {
        Subject subject = new Subject();
        subject.setName(name);
        subject.setColor(color);
        subject.setType(SubjectType.CLASS);
        return subject;
    }

}
