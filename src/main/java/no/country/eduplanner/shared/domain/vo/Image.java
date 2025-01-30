package no.country.eduplanner.shared.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.awt.font.TextHitInfo;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@SuperBuilder
public class Image {

    @Column(name = "image_url")
    private String originalUrl;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;


    protected Image() {
    }

    private Image(String url) {
        this.originalUrl = url;
    }

    public Image(String originalUrl, String thumbnailUrl) {
        this.originalUrl = originalUrl;
        this.thumbnailUrl = thumbnailUrl;
    }

    public static Image fromUrl(String url) {
        return new Image(url);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Image image)) return false;
        return Objects.equals(originalUrl, image.originalUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(originalUrl);
    }
}
