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
('VKDev', 'vkdev', '$2b$10$zqNOKVVpZw63ppdTUYX/5uE1gqpPS0Z3eXPlMClckOxJaip1HNEJm', 'developer@victorjardim.dev', 2), -- Senha 1
('Admin', 'admin', '$2b$10$zqNOKVVpZw63ppdTUYX/5uE1gqpPS0Z3eXPlMClckOxJaip1HNEJm', 'contato@victorjardim.dev', 1),
('Cliente Teste', 'teste', '$2b$10$zqNOKVVpZw63ppdTUYX/5uE1gqpPS0Z3eXPlMClckOxJaip1HNEJm', 'teste@victorjardim.dev', 0);

CREATE TABLE games (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  url_cover VARCHAR(255) NULL DEFAULT NULL,
  avaliable TINYINT(1) NOT NULL DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO games (name, price, stock, avaliable) VALUES
('Gran Turismo', 39.99, 20, 1),
('YuGiOh', 59.99, 20, 1),
('Harvest Moon', 29.99, 20, 1);
