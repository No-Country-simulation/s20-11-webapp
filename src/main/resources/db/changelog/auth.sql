-- liquibase formatted sql

-- changeset crist:1737563883121-1
CREATE TABLE user_roles
(
    user_id BIGINT       NOT NULL,
    role    VARCHAR(255) NOT NULL
);

-- changeset crist:1737563883121-2
CREATE TABLE users
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    version            INTEGER                                 NOT NULL,
    created_at         TIMESTAMP WITHOUT TIME ZONE             NOT NULL,
    last_modified_at   TIMESTAMP WITHOUT TIME ZONE             NOT NULL,
    created_by         VARCHAR(255)                            NOT NULL,
    last_modified_by   VARCHAR(255),
    email              VARCHAR(255),
    password           VARCHAR(255),
    profile_first_name VARCHAR(50),
    profile_last_name  VARCHAR(50),
    profile_photo      VARCHAR(255),
    CONSTRAINT pk_users PRIMARY KEY (id)
);

-- changeset crist:1737563883121-3
ALTER TABLE user_roles
    ADD CONSTRAINT fk_user_roles_on_user_entity FOREIGN KEY (user_id) REFERENCES users (id);

