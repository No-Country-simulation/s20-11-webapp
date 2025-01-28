package no.country.eduplanner.auth.repository;

import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u FROM UserEntity u JOIN u.roles r WHERE u.id IN :ids AND r = :role")
    List<UserEntity> findAllByIdsAndRole(List<Long> ids, UserRole role);

    boolean existsByEmail(String email);

}
