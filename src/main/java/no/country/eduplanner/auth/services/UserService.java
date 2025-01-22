package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return userRepository.findByEmail(email)
                             .map(this::toSecurityUser)
                             .orElseThrow(() -> new UsernameNotFoundException(
                                     "El usuario con correo: [" + email + "] no existe."));


    }

    private User toSecurityUser(UserEntity ue) {
        return new User(
                ue.getEmail(),
                ue.getPassword(),
                true,
                true,
                true,
                true,
                ue.getRoles()
        );
    }

}
