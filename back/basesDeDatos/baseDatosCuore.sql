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
    ubicacion POINT NOT NULL,
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
    id INT UNSIGNED AUTO_INCREMENT,
    nick_publicacion VARCHAR(50) NOT NULL,
    texto VARCHAR (255),
    imagen VARCHAR(300)NOT NULL,
    creado DATETIME NOT NULL DEFAULT current_timestamp,
    CONSTRAINT PK_publicaciones PRIMARY KEY (id),
    CONSTRAINT FK_publicaciones_usuarios FOREIGN KEY (nick_publicacion) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS reacciones (
    id_publicacion INT UNSIGNED NOT NULL,
    nick_reaccion VARCHAR(50) NOT NULL,
    labios TINYINT(1) NOT NULL DEFAULT 0,
    pulgar TINYINT(1) NOT NULL DEFAULT 0,
    fuego TINYINT(1) NOT NULL DEFAULT 0,
    corazon TINYINT(1) NOT NULL DEFAULT 0,
    dislike TINYINT(1) NOT NULL DEFAULT 0,    
    CONSTRAINT PK_reacciones PRIMARY KEY (id_publicacion, nick_reaccion),
    CONSTRAINT FK_reacciones_usuarios FOREIGN KEY (nick_reaccion) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_reacciones_publicaciones FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comentarios (
    id INT UNSIGNED AUTO_INCREMENT,
    id_publicacion INT UNSIGNED NOT NULL,
    nick_comenta VARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT current_timestamp,
    comentario VARCHAR(255) NOT NULL,
    CONSTRAINT PK_comentarios PRIMARY KEY (id),
    CONSTRAINT FK_comentarios_usuarios FOREIGN KEY (nick_comenta) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_comentarios_publicaciones FOREIGN KEY (id_publicacion) REFERENCES publicaciones (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS mensajes (
    idMensaje INT UNSIGNED AUTO_INCREMENT,
    nick_origen VARCHAR(50) NOT NULL, 
    nick_destino VARCHAR(50) NOT NULL,                    
    texto VARCHAR (500) NOT NULL,
    creado DATETIME NOT NULL DEFAULT current_timestamp,
    CONSTRAINT PK_mensajes PRIMARY KEY (idMensaje),
    CONSTRAINT FK_mensajes_usuarios_origen FOREIGN KEY (nick_origen) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_mensajes_usuarios_destino FOREIGN KEY (nick_destino) REFERENCES usuarios (nick) ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER $$
CREATE FUNCTION distanciaCoordenadas(latitud1 float, longitud1 float, latitud2 float, longitud2 float) RETURNS float
BEGIN
  DECLARE distancia, radius, dlongitud float;
  SET radius = 6378.137;
  SET latitud1 = latitud1 * PI() / 180;
  SET longitud1 = longitud1 * PI() / 180;
  SET latitud2 = latitud2 * PI() / 180;
  SET longitud2 = longitud2 * PI() / 180;
  SET dlongitud = longitud2 - longitud1;
  SET distancia = ACOS(SIN(latitud1) * SIN(latitud2) + COS(latitud1) * COS(latitud2) * COS(dlongitud)) * radius * 1000;
  RETURN distancia;
END;
$$
DELIMITER ;

-- McDonalds Point(40.29375431039264, -3.790687016207737)
-- Colegio Naranjos Pint(40.29912151699193, -3.8043641237169292)
-- Getafe Point(40.30681283641621, -3.7323198235195036)
-- Polvoranca Point(40.312213492411146, -3.783943456310229)
-- Severo Ochoa Point(40.320150845041844, -3.7686803144332934)
-- Barcelona Point(41.38886862575714, 2.0865438469839015)
-- Toledo Point(39.87084321462097, -3.9985578673362903)
-- Salamanca Point(40.942848416699114, -5.666524847079947)
-- Alemania Point(50.95174016333904, 10.341533032945701)
-- Francia Point(46.44238517908162, 2.47469339051577)