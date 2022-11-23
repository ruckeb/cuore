CREATE DATABASE IF NOT EXISTS Cuore;
USE Cuore;

CREATE TABLE IF NOT EXISTS usuarios (
    nick VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    rol ENUM (chicaBUSCAchica, chicaBUSCAchico, chicoBUSCAchico, chicoBUSCAchica, chic@BUSCAchic@),
    imagen VARCHAR(300) NOT NULL,
    video_present VARCHAR(500) NOT NULL,
    clave VARCHAR(10) NOT NULL,
    PRIMARY KEY (nick)
);

CREATE TABLE IF NOT EXISTS publicaciones(
    idPublicacion INT UNSIGNED AUTO_INCREMENT,
    nick VARCHAR(50) NOT NULL,
    texto VARCHAR (500),
    imagen VARCHAR(300)NOT NULL,
    creado DATETIME NOT NULL,
    PRIMARY KEY (idPublicacion),
    FOREIGN KEY (nick) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS mensajes (
    idMensaje INT UNSIGNED AUTO_INCREMENT,
    nick VARCHAR(50) NOT NULL, 
    nick_destino VARCHAR(50) NOT NULL,                    
    texto VARCHAR (500) NOT NULL,
    creado DATETIME NOT NULL,
    PRIMARY KEY (idMensaje),
    FOREIGN KEY (nick) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (nick_destino) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE
);