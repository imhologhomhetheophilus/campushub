CREATE TABLE courses (
    course_id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT(10) UNSIGNED NOT NULL,
    department_id INT(10) UNSIGNED NOT NULL,
    programme_id INT(10) UNSIGNED NOT NULL,
    level_id INT(10) UNSIGNED NOT NULL,
    semester_id INT(10) UNSIGNED NOT NULL,

    course_code VARCHAR(20) NOT NULL,
    course_title VARCHAR(200) NOT NULL,
    course_unit TINYINT(3) UNSIGNED NOT NULL,
    course_type ENUM('Core','Elective') NOT NULL DEFAULT 'Core',

    description TEXT NULL,

    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_course_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_programme
        FOREIGN KEY (programme_id)
        REFERENCES programmes(programme_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_level
        FOREIGN KEY (level_id)
        REFERENCES levels(level_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_course_semester
        FOREIGN KEY (semester_id)
        REFERENCES semesters(semester_id)
        ON DELETE CASCADE,

    UNIQUE KEY uk_course_code (
        programme_id,
        level_id,
        semester_id,
        course_code
    )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;