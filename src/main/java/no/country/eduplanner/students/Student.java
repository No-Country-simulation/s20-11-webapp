package no.country.eduplanner.students;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.shared.domain.base.BaseEntity;

@Entity
@Table(name = "students")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Getter
@Setter
public class Student extends BaseEntity {


    //This is here only for future use, in case we need to add more fields related to the student
    @Column(name = "user_id", nullable = false)
    private Long userId;

}
