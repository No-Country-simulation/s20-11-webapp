package no.country.eduplanner.auth.services;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.country.eduplanner.auth.dto.ProfileRequest;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.exceptions.InvalidFileSizeException;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.auth.mapper.UserMapper;
import no.country.eduplanner.auth.models.Profile;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.shared.domain.vo.Image;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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

    private static final long MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;


    @Cacheable(value = "userDataCache", key = "#root.target.getCurrentUsername()")
    public UserData getCurrentUserData() {
        String currentUsername = getCurrentUsername();

        log.info("👤 Cache miss - Fetching Info from the database for user [{}]", currentUsername);

        UserEntity user = userRepository
                .findByEmail(currentUsername)
                .orElseThrow(() -> new UserNotFoundException(currentUsername));

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

    @CacheEvict(value = "userDataCache", key = "#root.target.getCurrentUsername()")
    @Transactional
    public UserData updateUserProfilePhoto(MultipartFile file) {
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new InvalidFileSizeException();
        }

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

    @CacheEvict(value = "userDataCache", key = "#root.target.getCurrentUsername()")
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

    public String getCurrentUsername() {
        return ((UserDetails) SecurityContextHolder.getContext()
                                                   .getAuthentication()
                                                   .getPrincipal())
                .getUsername();
    }

    private UserEntity getCurrentUserEntity() {
        UserData currentUserData = getCurrentUserData();

        return userRepository.findById(currentUserData.id())
                             .orElseThrow(() -> new UserNotFoundException(currentUserData.id()));
    }
}
