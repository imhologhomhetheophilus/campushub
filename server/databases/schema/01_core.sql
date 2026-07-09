/*
==========================================================
CampusHub
Module: 01_core.sql
Version: 1.0.0
Author: Job Jacob
Description:
Core database schema for CampusHub.

Contains:
- Database creation
- Institutions
- Roles
- Faculties
- Departments
- Programmes
- Levels
==========================================================
*/

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
      institution_code VARCHAR(20) NOT NULL UNIQUE,
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
-- =====================================================
-- TABLE: programmes
-- =====================================================

CREATE TABLE programmes (
    programme_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,
    department_id INT UNSIGNED NOT NULL,

    programme_name VARCHAR(150) NOT NULL,
    programme_code VARCHAR(20) NOT NULL,

    award_type ENUM(
        'ND',
        'HND',
        'BSc',
        'BA',
        'BEng',
        'BTech',
        'PGD',
        'MSc',
        'MBA',
        'PhD',
        'Other'
    ) NOT NULL,

    duration_years TINYINT UNSIGNED NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_programme_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_programme_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_programme_name
        UNIQUE (institution_id, department_id, programme_name, award_type),

    CONSTRAINT uq_programme_code
        UNIQUE (institution_id, programme_code)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLE: levels
-- =====================================================

CREATE TABLE levels (
    level_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    programme_id INT UNSIGNED NOT NULL,

    level_name VARCHAR(30) NOT NULL,
    level_order TINYINT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_level_programme
        FOREIGN KEY (programme_id)
        REFERENCES programmes(programme_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_programme_level
        UNIQUE (programme_id, level_name)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================================
-- TABLE: users
-- =====================================================

CREATE TABLE users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    institution_id INT UNSIGNED NOT NULL,
    role_id INT UNSIGNED NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) DEFAULT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,

    password_hash VARCHAR(255) NOT NULL,

    gender ENUM('Male', 'Female', 'Other') DEFAULT NULL,
    date_of_birth DATE DEFAULT NULL,

    profile_image VARCHAR(255) DEFAULT NULL,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    last_login DATETIME DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_institution
        FOREIGN KEY (institution_id)
        REFERENCES institutions(institution_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT uq_user_email
        UNIQUE (institution_id, email)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- =====================================================
-- TABLE: students
-- =====================================================

CREATE TABLE students (
    student_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    programme_id INT UNSIGNED NOT NULL,
    level_id INT UNSIGNED NOT NULL,

    matric_number VARCHAR(50) NOT NULL,

    admission_year YEAR NOT NULL,
    graduation_year YEAR DEFAULT NULL,

    academic_status ENUM(
        'Active',
        'Graduated',
        'Suspended',
        'Withdrawn',
        'Deferred'
    ) DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_student_programme
        FOREIGN KEY (programme_id)
        REFERENCES programmes(programme_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_student_level
        FOREIGN KEY (level_id)
        REFERENCES levels(level_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT uq_student_user
        UNIQUE (user_id),

    CONSTRAINT uq_student_matric
        UNIQUE (matric_number)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- =====================================================
-- TABLE: lecturers
-- =====================================================

CREATE TABLE lecturers (
    lecturer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    department_id INT UNSIGNED NOT NULL,

    staff_number VARCHAR(50) NOT NULL,

    academic_rank ENUM(
        'Graduate Assistant',
        'Assistant Lecturer',
        'Lecturer II',
        'Lecturer I',
        'Senior Lecturer',
        'Principal Lecturer',
        'Chief Lecturer',
        'Associate Professor',
        'Professor',
        'Other'
    ) DEFAULT 'Lecturer II',

    employment_date DATE DEFAULT NULL,

    office_location VARCHAR(255) DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_lecturer_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_lecturer_department
        FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT uq_lecturer_user
        UNIQUE (user_id),

    CONSTRAINT uq_staff_number
        UNIQUE (staff_number)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- =====================================================
-- TABLE: admins
-- =====================================================

CREATE TABLE admins (
    admin_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    position VARCHAR(100) NOT NULL,

    office_location VARCHAR(255) DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_admin_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT uq_admin_user
        UNIQUE (user_id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;