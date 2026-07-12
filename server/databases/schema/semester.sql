CREATE TABLE semesters (
    semester_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,
    session_id INT UNSIGNED NOT NULL,

    semester_name VARCHAR(50) NOT NULL,
    semester_code VARCHAR(20) NOT NULL,

    semester_order TINYINT UNSIGNED NOT NULL,

    start_date DATE NULL,
    end_date DATE NULL,

    is_current TINYINT(1) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,


    CONSTRAINT fk_semester_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE,


    CONSTRAINT fk_semester_session
        FOREIGN KEY (session_id)
        REFERENCES academic_sessions(session_id)
        ON DELETE CASCADE,


    CONSTRAINT uq_semester_name
        UNIQUE (session_id, semester_name),


    CONSTRAINT uq_semester_code
        UNIQUE (session_id, semester_code)

);