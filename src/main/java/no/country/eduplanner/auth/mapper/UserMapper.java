package no.country.eduplanner.auth.mapper;

import no.country.eduplanner.auth.dto.UserData;
import no.country.eduplanner.auth.models.Profile;
import no.country.eduplanner.auth.models.UserEntity;
import no.country.eduplanner.auth.models.UserRole;
import no.country.eduplanner.shared.application.dto.AuditInfo;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserData toUserData(UserEntity user) {
        Profile profile = user.getProfileInfo();

        String originalUrl = (profile != null && profile.getImage() != null)
                ? secureUrl(profile.getImage().getOriginalUrl())
                : null;

        String thumbnailUrl = (profile != null && profile.getImage() != null)
                ? secureUrl(profile.getImage().getThumbnailUrl())
                : null;


        return new UserData(
                user.getId(),
                user.getEmail(),
                user.getRoles().stream().map(UserRole::getAuthority).collect(java.util.stream.Collectors.toSet()),
                profile != null && profile.isProfileComplete(),
                profile != null ? profile.getFirstName() : null,
                profile != null ? profile.getLastName() : null,
                originalUrl,
                thumbnailUrl,
                AuditInfo.fromBaseEntity(user)
        );

    }

    private String secureUrl(String url) {
        if (url == null) {
            return null;
        }
        if (url.startsWith("http://")) {
            return "https://" + url.substring(7);
        }
        return url;
    }

}