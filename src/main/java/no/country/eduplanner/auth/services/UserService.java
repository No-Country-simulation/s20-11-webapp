package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.models.AccountStatus;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.auth.security.SecurityUser;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                             .map(SecurityUser::fromUserEntity)
                             .orElseThrow(() -> new UsernameNotFoundException(
                                     "El usuario con correo: [" + email + "] no existe."));


    }


    public AccountStatus getAccountStatus(String email) {
        log.info("🔐 Fetching account status for user [{}]", email);
        return userRepository.findAccountStatusByEmail(email);
    }


}
