package no.country.eduplanner.shared.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Objects;

@Embeddable
@Getter
@Setter
@SuperBuilder
public class Image {

    @Column(name = "image_url")
    private String url;


    protected Image() {
    }

    private Image(String url) {
        this.url = url;
    }

    public static Image fromUrl(String url) {
        return new Image(url);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Image image)) return false;
        return Objects.equals(url, image.url);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(url);
    }
}
