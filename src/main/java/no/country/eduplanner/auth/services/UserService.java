package no.country.eduplanner.auth.services;

import lombok.RequiredArgsConstructor;
import no.country.eduplanner.auth.dto.ProfileRequest;
import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.exceptions.UserNotFoundException;
import no.country.eduplanner.auth.mapper.UserMapper;
import no.country.eduplanner.auth.models.Profile;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.repository.UserRepository;
import no.country.eduplanner.shared.domain.vo.Image;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final UserMapper userMapper;


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

    public UserData updateUser(Long userId, ProfileRequest profileRequest, MultipartFile file) {
        Optional<UserEntity> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("Usuario no encontrado");
        }

        UserEntity user = userOptional.get();
        Profile profile = user.getProfileInfo();

        if (profileRequest != null) {
            profile.setFirstName(profileRequest.firstName());
            profile.setLastName(profileRequest.lastName());
        }

        // Si hay una nueva imagen, subirla a Cloudinary y actualizar la referencia
        if (file != null && !file.isEmpty()) {
            Image newImage = cloudinaryService.uploadImage(file);
            profile.setImage(newImage);
        }


        return userMapper.toUserData(userRepository.save(user));
    }
}
