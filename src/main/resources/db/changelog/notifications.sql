-- liquibase formatted sql

-- changeset crist:1737650036734-1
CREATE SEQUENCE IF NOT EXISTS primary_sequence START WITH 10000 INCREMENT BY 1;

-- changeset crist:1737650036734-2
CREATE TABLE notifications
(
    id               BIGINT                      NOT NULL,
    version          INTEGER                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by       VARCHAR(255)                NOT NULL,
    last_modified_by VARCHAR(255),
    title            VARCHAR(255)                NOT NULL,
    message          VARCHAR(255)                NOT NULL,
    scheduled_for    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    curso_id         BIGINT                      NOT NULL,
    subject_id       BIGINT,
    assigned_color   VARCHAR(255),
    is_expired       BOOLEAN                     NOT NULL,
    CONSTRAINT pk_notifications PRIMARY KEY (id)
);

