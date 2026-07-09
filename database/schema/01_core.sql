-- =====================================================
-- CampusHub Database
-- Module: 01_core.sql
-- Version: 1.0.0
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS campushub_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE campushub_db;

-- =====================================================
-- TABLE: institutions
-- =====================================================

CREATE TABLE institutions (
    institution_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    institution_type ENUM(
        'University',
        'Polytechnic',
        'College of Education',
        'Monotechnic',
        'Nursing School',
        'Other'
    ) NOT NULL,

    email VARCHAR(150),
    phone VARCHAR(20),
    website VARCHAR(255),
    logo VARCHAR(255),

    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Nigeria',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT uq_institution_name UNIQUE (institution_name),
    CONSTRAINT uq_institution_short_name UNIQUE (short_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLE: roles
-- =====================================================

CREATE TABLE roles (
    role_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    role_name VARCHAR(50) NOT NULL,
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT uq_role_name UNIQUE (role_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- Seed Roles
-- =====================================================

INSERT INTO roles (role_name, description)
VALUES
('Super Admin', 'Platform Owner'),
('Institution Admin', 'Institution Administrator'),
('Lecturer', 'Academic Staff'),
('Student', 'Student');
-- =====================================================
-- TABLE: faculties
-- =====================================================

CREATE TABLE faculties (
    faculty_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,

    faculty_name VARCHAR(150) NOT NULL,
    faculty_code VARCHAR(20) NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_faculty_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_faculty_name
        UNIQUE (institution_id, faculty_name),

    CONSTRAINT uq_faculty_code
        UNIQUE (institution_id, faculty_code)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLE: departments
-- =====================================================

CREATE TABLE departments (
    department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,

    faculty_id INT UNSIGNED NOT NULL,

    department_name VARCHAR(150) NOT NULL,

    department_code VARCHAR(20) NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_department_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_department_faculty
        FOREIGN KEY (faculty_id)
        REFERENCES faculties(faculty_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_department_name
        UNIQUE (institution_id, department_name),

    CONSTRAINT uq_department_code
        UNIQUE (institution_id, department_code)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;