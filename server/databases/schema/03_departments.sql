CREATE TABLE departments (
    department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    faculty_id INT UNSIGNED NOT NULL,

    department_name VARCHAR(150) NOT NULL,

    department_code VARCHAR(20) NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_department_faculty
        FOREIGN KEY (faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_department_name
        UNIQUE (faculty_id, department_name),

    CONSTRAINT uq_department_code
        UNIQUE (faculty_id, department_code)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;