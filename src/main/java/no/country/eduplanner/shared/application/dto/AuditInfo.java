package no.country.eduplanner.shared.application.dto;

import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.LocalDateTime;

public record AuditInfo(
        String createdBy,
        String lastModifiedBy,
        LocalDateTime createdAt,
        LocalDateTime lastModifiedAt
) {

    public static AuditInfo fromBaseEntity(BaseEntity baseEntity) {
        return new AuditInfo(
                baseEntity.getCreatedBy(),
                baseEntity.getLastModifiedBy(),
                baseEntity.getCreatedAt(),
                baseEntity.getLastModifiedAt()
        );
    }
}
