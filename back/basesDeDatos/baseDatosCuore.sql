CREATE DATABASE IF NOT EXISTS Cuore;
USE Cuore;

CREATE TABLE IF NOT EXISTS sexos (
    id INT UNSIGNED AUTO_INCREMENT,
    sexo VARCHAR(19) NOT NULL,
    CONSTRAINT PK_sexos PRIMARY KEY (id)
);

INSERT INTO sexos (sexo)
VALUES 
('Hombre'),
('Mujer'),
('Otro');

CREATE TABLE IF NOT EXISTS busquedas (
    id INT UNSIGNED AUTO_INCREMENT,
    busqueda VARCHAR(19) NOT NULL,
    CONSTRAINT PK_busquedas PRIMARY KEY (id)
);

INSERT INTO busquedas (busqueda)
VALUES 
('Hombres'),
('Mujeres'),
('Ambos');

CREATE TABLE IF NOT EXISTS usuarios (
    nick VARCHAR(50),
    nombre VARCHAR(50),
    fecha_nacimiento DATE NOT NULL, 
    email VARCHAR(150) UNIQUE NOT NULL,
    sexo INT UNSIGNED NOT NULL,
    perfil_busqueda INT UNSIGNED NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    video_present VARCHAR(255) NOT NULL,
    clave VARCHAR(60) NOT NULL,
    CONSTRAINT PK_usuarios PRIMARY KEY (nick),
    CONSTRAINT FK_usarios_sexos FOREIGN KEY (sexo) REFERENCES sexos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_usarios_busquedas FOREIGN KEY (perfil_busqueda) REFERENCES busquedas (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS visitas (
    id INT UNSIGNED AUTO_INCREMENT,
    nick VARCHAR(50) NOT NULL,
    ip VARCHAR(15) NOT NULL,
    fecha DATE NOT NULL,
    contador INT UNSIGNED NOT NULL,
    CONSTRAINT PK_visitas PRIMARY KEY (id),
    CONSTRAINT FK_visitas_usuarios FOREIGN KEY (nick) REFERENCES usuarios (nick) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS publicaciones(
    idPublicacion INT UNSIGNED AUTO_INCREMENT,
    nick VARCHAR(50) NOT NULL,
    texto VARCHAR (500),
    imagen VARCHAR(300)NOT NULL,
    creado DATETIME NOT NULL,
    CONSTRAINT PK_publicaciones PRIMARY KEY (idPublicacion),
    CONSTRAINT FK_publicaciones_usuarios FOREIGN KEY (nick) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS mensajes (
    idMensaje INT UNSIGNED AUTO_INCREMENT,
    nick VARCHAR(50) NOT NULL, 
    nick_destino VARCHAR(50) NOT NULL,                    
    texto VARCHAR (500) NOT NULL,
    creado DATETIME NOT NULL,
    CONSTRAINT PK_mensajes PRIMARY KEY (idMensaje),
    CONSTRAINT FK_mensajes_usuarios_origen FOREIGN KEY (nick) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_mensajes_usuarios_destino FOREIGN KEY (nick_destino) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE
);