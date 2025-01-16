package no.country.eduplanner.courses.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import no.country.eduplanner.courses.domain.vo.TimeRange;
import no.country.eduplanner.shared.domain.base.BaseEntity;
import org.hibernate.proxy.HibernateProxy;

import java.time.DayOfWeek;
import java.time.Duration;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "courses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
@Getter
@Setter
@ToString
public class Course extends BaseEntity {

    private String name;

    @Embedded
    private TimeRange timeRange;

    @Column(name = "block_duration", nullable = false)
    private Duration blockDuration;

    @Column(name = "break_duration", nullable = false)
    private Duration breakDuration;

    @Embedded
    private TimeRange lunchBreak;

    @ElementCollection
    @CollectionTable(
            name = "course_class_days",
            joinColumns = @JoinColumn(name = "course_id")
    )
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<DayOfWeek> classDays = new HashSet<>();

    @OneToOne(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private Schedule schedule;


    public void setSchedule(Schedule schedule) {
        this.schedule = schedule;
        schedule.setCourse(this);
    }

}

//
//creamos curso
//definimos duracion de bloques de clase
//duracion de recesos
//duracion de almuerzo
//
//duracion del dia escolar
//
//
//basado en esto calculamos los bloques disponibles para clases
//tomando en cuenta que cada clase tendra un receso posterior, con dos excepciones.
//La clase anterior al almuerzo
//la clase anterior a la salida
//
//
//de esta manera se crea una lista de bloques disponibles para cada dia, donde se pueden registrar
// "materias". Cada bloque ya tiene un rango de tiempo definido, un dia definido y un tipo definido,
// solo necesita ser relacionado con una asignatura.
//
//
//
//o de otra manera, en lugar de pedir duracion del dia escolar, preguntamos cuantos bloques de clase
// diarios para el curso, y en base a eso hacemos los calculos. De esta manera no necesitamos acomodarnos dento
// de un rango de tiempo y evitamos minutos "sobrantes"

//Adding to a day, it add its to the next block automatically, or you can specify the exact block/day