CREATE DATABASE IF NOT EXISTS world_builder;
USE world_builder;
SET GLOBAL max_allowed_packet=1073741824;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'writer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    genre VARCHAR(50),
    image_path LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE chapters (
    chapter_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    chapter_number INT NOT NULL,
    content LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE characters (
    character_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    role VARCHAR(50),
    image_path LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

CREATE TABLE maps (
    map_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    map_name VARCHAR(100) NOT NULL DEFAULT 'Main Map',
    image_path LONGTEXT,
    file_type VARCHAR(10) NOT NULL DEFAULT 'png', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    UNIQUE (project_id)
);

CREATE TABLE landmarks (
    landmark_id INT AUTO_INCREMENT PRIMARY KEY,
    map_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    x_coordinate DECIMAL(8,2) NOT NULL,
    y_coordinate DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (map_id) REFERENCES maps(map_id) ON DELETE CASCADE
);

CREATE TABLE character_images (
    character_image_id INT AUTO_INCREMENT PRIMARY KEY,
    character_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (character_id) REFERENCES characters(character_id) ON DELETE CASCADE
);