package no.country.eduplanner.auth.models;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import no.country.eduplanner.shared.domain.vo.Image;
import org.springframework.util.StringUtils;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
public class Profile {

    @Column(name = "first_name")
    @Size(max = 50)
    private String firstName;

    @Column(name = "last_name")
    @Size(max = 50)
    private String lastName;

    @Column(name = "profile_photo")
    @Embedded
    @AttributeOverride(name = "originalUrl", column = @Column(name = "profile_photo"))
    private Image image;

    public boolean isProfileComplete() {
        return StringUtils.hasText(firstName) &&
               StringUtils.hasText(lastName) &&
               image != null;
    }

}
