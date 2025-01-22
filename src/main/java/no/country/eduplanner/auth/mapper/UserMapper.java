package no.country.eduplanner.auth.mapper;

import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.Profile;
import no.country.eduplanner.auth.models.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserData toUserData(UserEntity user) {
        Profile profile = user.getProfileInfo();

        return new UserData(
                user.getId(),
                user.getEmail(),
                user.getRoles(),
                profile != null && profile.isProfileComplete(),
                profile != null ? profile.getFirstName() : null,
                profile != null ? profile.getLastName() : null,
                profile != null && profile.getPhoto() != null ? profile.getPhoto().getUrl() : null
        );

    }
}