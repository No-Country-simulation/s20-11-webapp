package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.enums.SubjectType;
import no.country.eduplanner.shared.domain.base.BaseEntity;
import no.country.eduplanner.shared.domain.vo.AdaptableColor;

@Entity
@Table(name = "subjects")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Getter
@Setter
@ToString
public class Subject extends BaseEntity {


    @Column(name = "name", nullable = false)
    private String name;

    @Embedded
    private AdaptableColor color;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private SubjectType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @ToString.Exclude
    private Course course;
}
