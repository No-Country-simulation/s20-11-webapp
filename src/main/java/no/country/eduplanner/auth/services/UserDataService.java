package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.auth.mapper.UserMapper;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserDataService {


    private final UserMapper userMapper;
    private final UserRepository userRepository;

    //TODO: CACHE THIS
    public UserData getCurrentUserData() {
        UserDetails currentUser = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        UserEntity user = userRepository
                .findByEmail(currentUser.getUsername())
                .orElseThrow(() -> new UserNotFoundException(currentUser.getUsername()));

        return userMapper.toUserData(user);
    }

    public List<UserData> getUsersDataFromIdsByRole(List<Long> userIds, UserRole role) {
        if (CollectionUtils.isEmpty(userIds)) {
            return Collections.emptyList();
        }

        List<UserEntity> foundUsers = userRepository.findAllByIdsAndRole(userIds,role);

        return foundUsers.stream()
                         .map(userMapper::toUserData)
                         .collect(Collectors.toList());
    }

}
