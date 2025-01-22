package no.country.eduplanner.admin.persistence.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import no.country.eduplanner.auth.persistence.entity.UserEntity;

@Setter
@Getter
@AllArgsConstructor
@Entity
@Table(name = "admins")
public class AdminEntity extends UserEntity {

}
