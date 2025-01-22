package no.country.eduplanner.auth.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "roles")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)  // Este campo es suficiente para almacenar el valor del rol.
    @Column(name = "role_name", nullable = false, unique = true)
    private ERole eRole;  // Enum de los roles (STUDENT, ADMIN, etc.)
}