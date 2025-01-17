-- liquibase formatted sql

--changeset your_name:create_primary_sequence
CREATE SEQUENCE primary_sequence
    START WITH 10000
    INCREMENT BY 1
    NO MAXVALUE
    NO CYCLE;