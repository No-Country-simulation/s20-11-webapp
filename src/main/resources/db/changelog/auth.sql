-- liquibase formatted sql

-- changeset crist:1737571065600-1
CREATE SEQUENCE IF NOT EXISTS primary_sequence START WITH 10000 INCREMENT BY 1;

-- changeset crist:1737571065600-2
CREATE TABLE user_roles
(
    user_id BIGINT       NOT NULL,
    role    VARCHAR(255) NOT NULL
);

-- changeset crist:1737571065600-3
CREATE TABLE users
(
    id                 BIGINT                      NOT NULL,
    version            INTEGER                     NOT NULL,
    created_at         TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at   TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by         VARCHAR(255)                NOT NULL,
    last_modified_by   VARCHAR(255),
    email              VARCHAR(255),
    password           VARCHAR(255),
    profile_first_name VARCHAR(50),
    profile_last_name  VARCHAR(50),
    profile_photo      VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

-- changeset crist:1737571065600-4
ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_on_user_entity FOREIGN KEY (user_id) REFERENCES users (id);

