package no.country.eduplanner.shared.application.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import no.country.eduplanner.shared.domain.base.BaseEntity;

import java.time.LocalDateTime;

@Schema(description = "Información de auditoría que registra quién y cuándo se creó o modificó un recurso")
public record AuditInfo(
        @Schema(
                description = "Correo del usuario que creó el recurso",
                example = "admin@example.com"
        )
        String createdBy,

        @Schema(
                description = "Correo del usuario que modificó el recurso por última vez",
                example = "user@example.com"
        )
        String lastModifiedBy,

        @Schema(
                description = "Fecha y hora de creación del recurso",
                example = "2023-10-01T12:00:00"
        )
        LocalDateTime createdAt,

        @Schema(
                description = "Fecha y hora de la última modificación del recurso",
                example = "2023-10-02T15:30:00"
        )
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
