package no.country.eduplanner.auth.services;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.ProfileRequest;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.auth.mapper.UserMapper;
import no.country.eduplanner.auth.models.Profile;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.shared.domain.vo.Image;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserDataService {


    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;


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

        List<UserEntity> foundUsers = userRepository.findAllByIdsAndRole(userIds, role);

        return foundUsers.stream()
                         .map(userMapper::toUserData)
                         .collect(Collectors.toList());
    }

    @Transactional
    public UserData updateUserProfilePhoto(MultipartFile file) {
        log.info("📷 Received file : {}", file.getOriginalFilename());
        UserEntity user = getCurrentUserEntity();

        Profile profile = Optional.ofNullable(user.getProfileInfo()).orElse(new Profile());


        if (file != null && !file.isEmpty()) {

            Image newImage = cloudinaryService.uploadImage(file);
            profile.setImage(newImage);
        }

        user.setProfileInfo(profile);
        log.info("📷 Updated profile photo for user {}", user.getEmail());
        return userMapper.toUserData(userRepository.save(user));
    }

    @Transactional
    public UserData updateUserProfileInfo(@Valid ProfileRequest profileRequest) {

        UserEntity user = getCurrentUserEntity();

        Profile profile = Optional.ofNullable(user.getProfileInfo()).orElse(new Profile());

        if (profileRequest != null) {
            profile.setFirstName(profileRequest.firstName() != null ? profileRequest.firstName() : null);
            profile.setLastName(profileRequest.lastName() != null ? profileRequest.lastName() : null);
        }
        user.setProfileInfo(profile);


        return userMapper.toUserData(userRepository.save(user));
    }

    private UserEntity getCurrentUserEntity() {
        UserData currentUserData = getCurrentUserData();

        return userRepository.findById(currentUserData.id())
                             .orElseThrow(() -> new UserNotFoundException(currentUserData.id()));
    }
}
