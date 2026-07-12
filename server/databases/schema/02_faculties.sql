-- =====================================================
-- TABLE: faculties
-- =====================================================

CREATE TABLE faculties (
    faculty_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,

    faculty_name VARCHAR(150) NOT NULL,

    faculty_code VARCHAR(20) NOT NULL,

    dean_name VARCHAR(150),

    email VARCHAR(150),

    phone VARCHAR(30),

    office_location VARCHAR(255),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_faculty_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_faculty_code
        UNIQUE (institution_id, faculty_code),

    CONSTRAINT uq_faculty_name
        UNIQUE (institution_id, faculty_name)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;