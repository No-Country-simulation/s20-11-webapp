-- liquibase formatted sql

-- changeset crist:1737853735136-1
CREATE SEQUENCE IF NOT EXISTS primary_sequence START WITH 10000 INCREMENT BY 1;

-- changeset crist:1737853735136-2
CREATE TABLE students
(
    id               BIGINT                      NOT NULL,
    version          INTEGER                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by       VARCHAR(255)                NOT NULL,
    last_modified_by VARCHAR(255),
    user_id          BIGINT                      NOT NULL,
    CONSTRAINT pk_students PRIMARY KEY (id)
);

