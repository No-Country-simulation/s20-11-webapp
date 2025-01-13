package no.country.eduplanner.auth.persistence.repository;

import no.country.eduplanner.auth.persistence.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, Long> {

}
