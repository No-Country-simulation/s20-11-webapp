-- liquibase formatted sql

-- changeset crist:1737570984834-1
CREATE SEQUENCE IF NOT EXISTS primary_sequence START WITH 10000 INCREMENT BY 1;

-- changeset crist:1737570984834-2
CREATE TABLE course_class_days
(
    course_id  BIGINT NOT NULL,
    class_days VARCHAR(255)
);

-- changeset crist:1737570984834-3
CREATE TABLE course_users
(
    id               BIGINT                      NOT NULL,
    version          INTEGER                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by       VARCHAR(255)                NOT NULL,
    last_modified_by VARCHAR(255),
    user_id          BIGINT,
    course_id        BIGINT,
    CONSTRAINT pk_course_users PRIMARY KEY (id)
);

-- changeset crist:1737570984834-4
CREATE TABLE courses
(
    id                  BIGINT                      NOT NULL,
    version             INTEGER                     NOT NULL,
    created_at          TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by          VARCHAR(255)                NOT NULL,
    last_modified_by    VARCHAR(255),
    name                VARCHAR(255),
    class_start_time    TIME WITHOUT TIME ZONE      NOT NULL,
    blocks_before_lunch INTEGER                     NOT NULL,
    blocks_after_lunch  INTEGER                     NOT NULL,
    block_duration      BIGINT                      NOT NULL,
    break_duration      BIGINT                      NOT NULL,
    lunch_duration      BIGINT                      NOT NULL,
    created_by_user_id  BIGINT                      NOT NULL,
    CONSTRAINT pk_courses PRIMARY KEY (id)
);

-- changeset crist:1737570984834-5
CREATE TABLE schedule_blocks
(
    id               BIGINT                      NOT NULL,
    version          INTEGER                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by       VARCHAR(255)                NOT NULL,
    last_modified_by VARCHAR(255),
    order_number     INTEGER                     NOT NULL,
    schedule_id      BIGINT                      NOT NULL,
    subject_id       BIGINT,
    day_of_week      VARCHAR(255)                NOT NULL,
    type             VARCHAR(255)                NOT NULL,
    start_time       TIME WITHOUT TIME ZONE      NOT NULL,
    end_time         TIME WITHOUT TIME ZONE      NOT NULL,
    CONSTRAINT pk_schedule_blocks PRIMARY KEY (id)
);

-- changeset crist:1737570984834-6
CREATE TABLE schedules
(
    id               BIGINT                      NOT NULL,
    version          INTEGER                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by       VARCHAR(255)                NOT NULL,
    last_modified_by VARCHAR(255),
    course_id        BIGINT,
    CONSTRAINT pk_schedules PRIMARY KEY (id)
);

-- changeset crist:1737570984834-7
CREATE TABLE subjects
(
    id               BIGINT                      NOT NULL,
    version          INTEGER                     NOT NULL,
    created_at       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    last_modified_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_by       VARCHAR(255)                NOT NULL,
    last_modified_by VARCHAR(255),
    name             VARCHAR(255)                NOT NULL,
    color            VARCHAR(255)                NOT NULL,
    type             VARCHAR(255)                NOT NULL,
    course_id        BIGINT,
    CONSTRAINT pk_subjects PRIMARY KEY (id)
);

-- changeset crist:1737570984834-8
ALTER TABLE schedules
    ADD CONSTRAINT uc_schedules_course UNIQUE (course_id);

-- changeset crist:1737570984834-9
ALTER TABLE subjects
    ADD CONSTRAINT uc_subjects_name UNIQUE (name);

-- changeset crist:1737570984834-10
ALTER TABLE course_users
    ADD CONSTRAINT FK_COURSE_USERS_ON_COURSE FOREIGN KEY (course_id) REFERENCES courses (id);

-- changeset crist:1737570984834-11
ALTER TABLE schedules
    ADD CONSTRAINT FK_SCHEDULES_ON_COURSE FOREIGN KEY (course_id) REFERENCES courses (id);

-- changeset crist:1737570984834-12
ALTER TABLE schedule_blocks
    ADD CONSTRAINT FK_SCHEDULE_BLOCKS_ON_SCHEDULE FOREIGN KEY (schedule_id) REFERENCES schedules (id);

-- changeset crist:1737570984834-13
ALTER TABLE schedule_blocks
    ADD CONSTRAINT FK_SCHEDULE_BLOCKS_ON_SUBJECT FOREIGN KEY (subject_id) REFERENCES subjects (id);

-- changeset crist:1737570984834-14
ALTER TABLE subjects
    ADD CONSTRAINT FK_SUBJECTS_ON_COURSE FOREIGN KEY (course_id) REFERENCES courses (id);

-- changeset crist:1737570984834-15
ALTER TABLE course_class_days
    ADD CONSTRAINT fk_course_class_days_on_course FOREIGN KEY (course_id) REFERENCES courses (id);

-- changeset crist:1737570984834-16
ALTER TABLE subjects
    DROP CONSTRAINT uc_subjects_name;