DROP DATABASE IF EXISTS storevkgames;

CREATE DATABASE IF NOT EXISTS storevkgames;

USE storevkgames;

CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_name VARCHAR(50) NOT NULL UNIQUE,
    user_pwd VARCHAR(255) NOT NULL,
    user_role TINYINT(1) NOT NULL DEFAULT 0 -- 0 Usuário, 1 Administrador, 2 Admin/Dev
);

INSERT INTO users (name, user_name, user_pwd, email, user_role) VALUES
('VKDev', 'vkdev', '123456', 'contato@victorjardim.dev', 2),
('Admin', 'admin', '1', 'developer@victorjardim.dev', 1),
('Cliente Teste', 'teste', '1', 'teste@victorjardim.dev', 0);

CREATE TABLE games (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

INSERT INTO games (name) VALUES
('Gran Turismo'),
('YuGiOh'),
('Harvest Moon');
