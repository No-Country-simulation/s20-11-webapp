package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
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
import java.util.Set;
import java.util.stream.Collectors;

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

        List<UserEntity> foundUsers = userRepository.findAllByIdsAndRole(userIds,role);

        return foundUsers.stream()
                         .map(userMapper::toUserData)
                         .collect(Collectors.toList());
    }

    @Transactional
    public UserData updateUser(ProfileRequest profileRequest, MultipartFile file) {
        UserData currentUserData = getCurrentUserData();

        UserEntity user = userRepository.findById(currentUserData.id())
                                        .orElseThrow(() -> new UserNotFoundException(currentUserData.id()));

        Profile profile = Optional.ofNullable(user.getProfileInfo()).orElse(new Profile());

        if (profileRequest != null) {
            profile.setFirstName(profileRequest.firstName());
            profile.setLastName(profileRequest.lastName());
        }

        // Si hay una nueva imagen, subirla a Cloudinary y actualizar la referencia
        if (file != null && !file.isEmpty()) {

            Image newImage = cloudinaryService.uploadImage(file);
            profile.setImage(newImage);
        }

        user.setProfileInfo(profile);

        return userMapper.toUserData(userRepository.save(user));
    }

}
