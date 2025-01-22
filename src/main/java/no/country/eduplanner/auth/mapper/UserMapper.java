package no.country.eduplanner.auth.mapper;

import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserData toUserData(UserEntity user) {
        return new UserData(
                user.getId(),
                user.getEmail(),
                user.getProfileInfo().isProfileComplete(),
                user.getProfileInfo().getFirstName(),
                user.getProfileInfo().getLastName(),
                user.getProfileInfo().getPhoto().getUrl()
        );

    }

}
