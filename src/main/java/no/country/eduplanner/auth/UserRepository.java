package no.country.eduplanner.auth;

import no.country.eduplanner.auth.models.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <UserEntity, Long>{
}
