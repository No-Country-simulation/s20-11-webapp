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

-- changeset crist:1738241837006-1
ALTER TABLE users
    ADD thumbnail_url VARCHAR(255);

-- changeset crist:1738466775882-2
ALTER TABLE users
    ADD account_status VARCHAR(255);
ALTER TABLE users
    ADD failed_logins INTEGER;
ALTER TABLE users
    ADD last_login_date TIMESTAMP WITHOUT TIME ZONE;

ALTER TABLE users
    ADD token_expiration TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE users
    ADD unlock_token VARCHAR(255);
ALTER TABLE users
    ADD unlock_token_expiration TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE users
    ADD verification_token VARCHAR(255);

-- changeset crist:1738466775882-10
ALTER TABLE users
    ADD CONSTRAINT uc_users_email UNIQUE (email);

-- changeset crist:1738466775882-1
ALTER TABLE users
    ALTER COLUMN email SET NOT NULL;

