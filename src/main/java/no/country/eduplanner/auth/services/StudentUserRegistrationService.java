package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.exceptions.UserAlreadyRegisteredException;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.shared.application.events.StudentRegistrationSucceedEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class StudentUserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationEventPublisher eventPublisher;



    public UserEntity registerStudent(String email, String courseName) {
        log.info("👨‍🎓 Student registration event received with email: {}", email);

        if (userRepository.existsByEmail(email)) {
            throw new UserAlreadyRegisteredException();
        }

        String tempUserPassword = generateTempPassword(email);
        String encodedTmpPassword = passwordEncoder.encode(tempUserPassword);

        UserEntity studentUser = UserEntity.builder()
                                           .email(email)
                                           .password(encodedTmpPassword)
                                           .roles(Set.of(UserRole.STUDENT))
                                           .build();

        UserEntity savedUser = userRepository.save(studentUser);

        eventPublisher.publishEvent(new StudentRegistrationSucceedEvent(
                savedUser.getId(),
                savedUser.getEmail(),
                courseName,
                tempUserPassword
        ));

        return savedUser;

    }

    private String generateTempPassword(String email) {
        String part = email.split("@")[0]
                .toLowerCase()
                .replace(".", "")
                .substring(0, 8);

        String code = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
        return part + "-" + code;
    }

}
