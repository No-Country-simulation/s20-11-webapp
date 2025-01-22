-- liquibase formatted sql

-- changeset crist:1
-- Crear la tabla 'roles'
CREATE TABLE roles
(
    id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    CONSTRAINT pk_roles PRIMARY KEY (id),
    CONSTRAINT unique_role_name UNIQUE (role_name)
);

-- changeset crist:2
-- Insertar los roles predefinidos (ADMIN y STUDENT)
INSERT INTO roles (role_name) VALUES ('ADMIN');
INSERT INTO roles (role_name) VALUES ('STUDENT');

-- changeset crist:3
-- Crear la tabla 'users'
CREATE TABLE users
(
    id BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(80) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT unique_username UNIQUE (username),
    CONSTRAINT unique_email UNIQUE (email)
);

-- changeset crist:4
-- Crear la tabla intermedia 'user_roles' para la relación muchos a muchos entre usuarios y roles
CREATE TABLE user_roles
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    CONSTRAINT pk_user_roles PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- changeset crist:5
-- Insertar un usuario de ejemplo (este sería el primer usuario que se puede usar para el login)
INSERT INTO users (username, password, email)
VALUES ('admin', 'adminpassword', 'admin@example.com');

-- changeset crist:6
-- Asignar el rol de ADMIN al usuario insertado
INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE username = 'admin'),
    (SELECT id FROM roles WHERE role_name = 'ADMIN')
);

-- changeset crist:7
-- Insertar un usuario de ejemplo para un estudiante
INSERT INTO users (username, password, email)
VALUES ('student', 'studentpassword', 'student@example.com');

-- changeset crist:8
-- Asignar el rol de STUDENT al usuario insertado
INSERT INTO user_roles (user_id, role_id)
VALUES (
    (SELECT id FROM users WHERE username = 'student'),
    (SELECT id FROM roles WHERE role_name = 'STUDENT')
);
