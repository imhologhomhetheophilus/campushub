-- =====================================================
-- TABLE: levels
-- =====================================================

CREATE TABLE levels (

    level_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,

    programme_id INT UNSIGNED NOT NULL,

    level_name VARCHAR(100) NOT NULL,

    level_code VARCHAR(20) NOT NULL,

    level_order TINYINT UNSIGNED NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_level_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_level_programme
        FOREIGN KEY (programme_id)
        REFERENCES programmes(programme_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_level_name
        UNIQUE (programme_id, level_name),

    CONSTRAINT uq_level_code
        UNIQUE (programme_id, level_code)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;