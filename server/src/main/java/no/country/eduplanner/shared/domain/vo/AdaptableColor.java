package no.country.eduplanner.shared.domain.vo;

import jakarta.persistence.Embeddable;

@Embeddable
public record AdaptableColor(
        String dark,
        String light
) {
}
