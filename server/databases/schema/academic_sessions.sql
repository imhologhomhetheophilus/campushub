CREATE TABLE academic_sessions (
    session_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,

    session_name VARCHAR(20) NOT NULL,

    start_year YEAR NOT NULL,

    end_year YEAR NOT NULL,

    start_date DATE,

    end_date DATE,

    is_current BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_session_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_session_name
        UNIQUE (institution_id, session_name)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;