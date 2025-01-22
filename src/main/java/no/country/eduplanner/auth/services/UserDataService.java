package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.auth.mapper.UserMapper;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserDataService {


    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserData getCurrentUserData() {
        UserDetails currentUser = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        UserEntity user = userRepository
                .findByEmail(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException(currentUser.getUsername()));

        return userMapper.toUserData(user);
    }

}
