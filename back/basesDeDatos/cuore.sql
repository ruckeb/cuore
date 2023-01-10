-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2023 a las 17:18:54
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cuore`
--

DELIMITER $$
--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `distanciaCoordenadas` (`latitud1` FLOAT, `longitud1` FLOAT, `latitud2` FLOAT, `longitud2` FLOAT) RETURNS FLOAT BEGIN
  DECLARE distancia, radius, dlongitud float;
  SET radius = 6378.137;
  SET latitud1 = latitud1 * PI() / 180;
  SET longitud1 = longitud1 * PI() / 180;
  SET latitud2 = latitud2 * PI() / 180;
  SET longitud2 = longitud2 * PI() / 180;
  SET dlongitud = longitud2 - longitud1;
  SET distancia = ACOS(SIN(latitud1) * SIN(latitud2) + COS(latitud1) * COS(latitud2) * COS(dlongitud)) * radius * 1000;
  RETURN distancia;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busquedas`
--

CREATE TABLE `busquedas` (
  `id` int(10) UNSIGNED NOT NULL,
  `busqueda` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `busquedas`
--

INSERT INTO `busquedas` (`id`, `busqueda`) VALUES
(1, 'Hombres'),
(2, 'Mujeres'),
(3, 'Intersexo hombre'),
(4, 'Intersexo mujer'),
(5, 'Hombres-Mujeres'),
(6, 'Hombres-Intersexo hombre'),
(7, 'Hombres-Intersexo mujer'),
(8, 'Mujeres-Intersexo hombre'),
(9, 'Mujeres-Intersexo mujer'),
(10, 'Intersexo hombre-Intersexo mujer'),
(11, 'Todos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_publicacion` int(10) UNSIGNED NOT NULL,
  `nick_comenta` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `comentario` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_publicacion`, `nick_comenta`, `fecha`, `comentario`) VALUES
(3, 11, 'Daniel', '2023-01-10 16:00:43', 'Guapaaaaa!'),
(4, 15, 'Daniel', '2023-01-10 16:03:52', 'El tiempo pasa pero tu mirada enamora'),
(5, 15, 'Anthony', '2023-01-10 16:04:38', 'Que sonrisa tan bonita :D'),
(6, 35, 'Anthony', '2023-01-10 16:05:49', '¿Qué hace una mujer como tú en un sitio como este?'),
(7, 35, 'Anthony', '2023-01-10 16:06:00', 'Ufff'),
(8, 23, 'Anthony', '2023-01-10 16:06:26', 'El color de la ceja.....'),
(9, 27, 'Anthony', '2023-01-10 16:07:12', 'Que sombrerito tan liiindo'),
(10, 35, 'Lolo', '2023-01-10 16:08:24', 'Esas gafas seguro que son las más baratas, cómprate otras y hablamos'),
(11, 27, 'Lolo', '2023-01-10 16:09:10', '¿Dónde estás? Que sitio tan bonito'),
(12, 19, 'Lolo', '2023-01-10 16:09:55', 'Qué jovencitaaa!! Te gusta bailar?'),
(13, 23, 'Lolo', '2023-01-10 16:10:55', 'Hmmmm la foto me hace dudar, sube otra!!'),
(14, 15, 'Lolo', '2023-01-10 16:11:33', 'Simplemente GUUAU <3'),
(15, 13, 'Lolo', '2023-01-10 16:12:15', 'Mi limón, mi limonerooo'),
(16, 11, 'Lolo', '2023-01-10 16:12:47', 'Oleeee mi niñaaa'),
(17, 57, 'Lolo', '2023-01-10 16:13:21', 'Ojazooos '),
(18, 53, 'Lolo', '2023-01-10 16:14:17', 'Sois un pack?'),
(19, 57, 'Leo', '2023-01-10 16:18:04', 'Te gusta el vino blanco y las cenitas románticas?'),
(20, 39, 'Leo', '2023-01-10 16:18:27', 'Ese flequillo es fabuloso! OLEEE'),
(21, 76, 'Leo', '2023-01-10 16:19:29', 'u.u esa informática buenaaa!!'),
(22, 59, 'Steve', '2023-01-10 16:21:06', 'Me acabo de mudar a la ciudad, ¿podrías darme instrucciones de cómo llegar hasta tu casa?'),
(23, 57, 'Steve', '2023-01-10 16:21:29', 'Yo hasta hace un momento era homosexual'),
(24, 39, 'Steve', '2023-01-10 16:22:02', 'No sé besar, ¿tú podrías enseñarme?'),
(25, 43, 'Steve', '2023-01-10 16:22:25', 'No sé bien si yo soy tu tipo pero, ¿por qué no nos damos una oportunidad para averiguarlo?'),
(26, 19, 'Steve', '2023-01-10 16:22:41', ' Yo no tengo la culpa de que me gustes. La culpa es tuya, por tener todo lo que a mí me encanta'),
(27, 23, 'Steve', '2023-01-10 16:22:58', ' Seguro que tenemos muchas cosas en común, ¿qué te parece si tomamos el atrevimiento de averiguarlo?'),
(28, 27, 'Steve', '2023-01-10 16:23:26', 'Si ser sexy fuera un delito tendrías que pasar el resto de tu vida en la cárcel'),
(29, 15, 'Steve', '2023-01-10 16:23:49', 'Disculpa, ¿de casualidad no tendremos algún amigo en común que pueda presentarnos?'),
(30, 13, 'Steve', '2023-01-10 16:24:05', 'No pierdas el tiempo buscando a tu media naranja, ¡aquí estoy!'),
(31, 11, 'Steve', '2023-01-10 16:24:18', 'Por tentaciones como tú, hay tantos pecadores como yo'),
(32, 35, 'Steve', '2023-01-10 16:25:11', '¿Dónde venden los números para ganarse este premio?'),
(34, 76, 'Steve', '2023-01-10 16:26:08', 'En todas partes te oigo, en todas partes te miro, no estás en todas partes pero te llevo conmigo'),
(35, 39, 'Andrea', '2023-01-10 16:28:40', 'Deseo tener hijos preciosos algún día y quisiera pedirle a tus padres unos cuantos consejos, para saber cómo lo lograron'),
(36, 59, 'Andrea', '2023-01-10 16:29:04', 'De las 24 horas que tiene el día, 16 pienso en ti y las otras 8 sueño contigo'),
(37, 35, 'Andrea', '2023-01-10 16:31:16', '¿Te llamas WiFi? Porque realmente estoy sintiendo una conexión'),
(38, 35, 'Manuel', '2023-01-10 16:32:06', 'Si tuviera cuatro monedas de 50 céntimos para darle a las cuatro mujeres más bellas del mundo, tú tendrías dos euros'),
(39, 11, 'Sergio', '2023-01-10 16:33:01', 'Creo que algo va mal en mi teléfono. ¿Podrías intentar llamarme para ver si funciona? 622552244'),
(40, 15, 'Sergio', '2023-01-10 16:33:22', 'Nunca jugaría al escondite contigo, porque alguien como tú es imposible de encontrar'),
(41, 35, 'Sergio', '2023-01-10 16:33:43', 'No me digas si quieres que te lleve a cenar. Simplemente, sonríe para decir que sí, o haz una triple voltereta hacia atrás para decir que no');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `usuario_origen` varchar(50) NOT NULL,
  `usuario_destino` varchar(50) NOT NULL,
  `amor` tinyint(1) NOT NULL DEFAULT 0,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`usuario_origen`, `usuario_destino`, `amor`, `fecha`) VALUES
('Jade', 'Peter', 1, '2023-01-10 16:54:12'),
('Peter', 'Jade', 1, '2023-01-10 16:53:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `idMensaje` int(10) UNSIGNED NOT NULL,
  `nick_origen` varchar(50) NOT NULL,
  `nick_destino` varchar(50) NOT NULL,
  `texto` varchar(500) NOT NULL,
  `creado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`idMensaje`, `nick_origen`, `nick_destino`, `texto`, `creado`) VALUES
(9, 'Peter', 'Andrea', 'hola que tal', '2023-01-10 17:09:24'),
(10, 'Peter', 'Beatriz', 'hola que tal', '2023-01-10 17:09:30'),
(11, 'Peter', 'Dalia', 'hola que tal', '2023-01-10 17:09:34'),
(12, 'Peter', 'Estrella', 'hola que tal', '2023-01-10 17:09:41'),
(13, 'Peter', 'Eva', 'hola que tal', '2023-01-10 17:09:46'),
(14, 'Peter', 'Gadea', 'hola que tal', '2023-01-10 17:09:53'),
(15, 'Peter', 'Iris', 'hola que tal', '2023-01-10 17:14:48'),
(16, 'Peter', 'Jade', 'hola que tal', '2023-01-10 17:14:58'),
(17, 'Peter', 'Lucia', 'hola que tal', '2023-01-10 17:15:10'),
(18, 'Peter', 'Maria', 'hola que tal', '2023-01-10 17:15:16'),
(19, 'Peter', 'Maribel', 'hola que tal', '2023-01-10 17:15:28'),
(20, 'Peter', 'Mia', 'hola que tal', '2023-01-10 17:15:35'),
(21, 'Peter', 'MarSophie', 'hola que tal', '2023-01-10 17:15:46'),
(22, 'Peter', 'Salma', 'hola que tla', '2023-01-10 17:15:55'),
(23, 'Peter', 'Sara', 'hola que tal', '2023-01-10 17:16:07'),
(24, 'Peter', 'Sofia', 'hola que tal', '2023-01-10 17:16:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(10) UNSIGNED NOT NULL,
  `nick_publicacion` varchar(50) NOT NULL,
  `texto` varchar(255) DEFAULT NULL,
  `imagen` varchar(300) NOT NULL,
  `creado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `nick_publicacion`, `texto`, `imagen`, `creado`) VALUES
(1, 'Sara', NULL, '/back/uploads/img/cuore63aed654ca5350.85388732.jpg', '2022-12-30 13:15:16'),
(5, 'Daniel', NULL, '/back/uploads/img/cuore63b020330f8665.78766251.png', '2022-12-31 12:42:43'),
(6, 'Daniel', NULL, '/back/uploads/vid/cuore63b020331155f7.52395112.mp4', '2022-12-31 12:42:43'),
(9, 'Anthony', NULL, '/back/uploads/img/cuore63b027edb66488.72632875.png', '2022-12-31 13:15:41'),
(10, 'Anthony', NULL, '/back/uploads/vid/cuore63b027edb79ef6.08863057.mp4', '2022-12-31 13:15:41'),
(11, 'Iris', NULL, '/back/uploads/img/cuore63b0452f57c3c1.86613865.png', '2022-12-31 15:20:31'),
(12, 'Iris', NULL, '/back/uploads/vid/cuore63b0452f59c625.60580762.mp4', '2022-12-31 15:20:31'),
(13, 'Mia', NULL, '/back/uploads/img/cuore63b046ad3860a8.42246799.png', '2022-12-31 15:26:53'),
(14, 'Mia', NULL, '/back/uploads/vid/cuore63b046ad3b2da4.04398950.mp4', '2022-12-31 15:26:53'),
(15, 'Sofia', NULL, '/back/uploads/img/cuore63b047fd9e9569.19481779.png', '2022-12-31 15:32:29'),
(16, 'Sofia', NULL, '/back/uploads/vid/cuore63b047fda027d4.80911238.mp4', '2022-12-31 15:32:29'),
(17, 'Sergio', NULL, '/back/uploads/img/cuore63b04a29e788e0.32321335.png', '2022-12-31 15:41:46'),
(18, 'Sergio', NULL, '/back/uploads/vid/cuore63b04a29e8beb9.41217410.mp4', '2022-12-31 15:41:46'),
(19, 'Dalia', NULL, '/back/uploads/img/cuore63b070241741f7.04732201.png', '2022-12-31 18:23:48'),
(20, 'Dalia', NULL, '/back/uploads/vid/cuore63b07024190254.12677511.mp4', '2022-12-31 18:23:48'),
(21, 'Saul', NULL, '/back/uploads/img/cuore63b0710e140ac9.04441861.png', '2022-12-31 18:27:42'),
(22, 'Saul', NULL, '/back/uploads/vid/cuore63b0710e1614d9.07438284.mp4', '2022-12-31 18:27:42'),
(23, 'Eva', NULL, '/back/uploads/img/cuore63b0723f1af0a3.91306056.png', '2022-12-31 18:32:47'),
(24, 'Eva', NULL, '/back/uploads/vid/cuore63b0723f1cbd03.35516653.mp4', '2022-12-31 18:32:47'),
(25, 'Maribel', NULL, '/back/uploads/img/cuore63b072e250b532.20585033.png', '2022-12-31 18:35:30'),
(26, 'Maribel', NULL, '/back/uploads/vid/cuore63b072e252c0f5.80215506.mp4', '2022-12-31 18:35:30'),
(27, 'Lucia', NULL, '/back/uploads/img/cuore63b079723aded7.05877547.png', '2022-12-31 19:03:30'),
(28, 'Lucia', NULL, '/back/uploads/vid/cuore63b079723d0da9.37853732.mp4', '2022-12-31 19:03:30'),
(29, 'Manuel', NULL, '/back/uploads/img/cuore63b1714b4bd8d8.61457168.png', '2023-01-01 12:40:59'),
(30, 'Manuel', NULL, '/back/uploads/vid/cuore63b1714b4dc0c4.66722244.mp4', '2023-01-01 12:40:59'),
(31, 'Fede', NULL, '/back/uploads/img/cuore63b173a35e9ae3.30490913.png', '2023-01-01 12:50:59'),
(32, 'Fede', NULL, '/back/uploads/vid/cuore63b173a360a156.93344266.mp4', '2023-01-01 12:50:59'),
(33, 'Lolo', NULL, '/back/uploads/img/cuore63b17497396f07.76427157.png', '2023-01-01 12:55:03'),
(34, 'Lolo', NULL, '/back/uploads/vid/cuore63b174973b9aa1.81042707.mp4', '2023-01-01 12:55:03'),
(35, 'Beatriz', NULL, '/back/uploads/img/cuore63b175d1906674.91292459.png', '2023-01-01 13:00:17'),
(36, 'Beatriz', NULL, '/back/uploads/vid/cuore63b175d192e931.95930808.mp4', '2023-01-01 13:00:17'),
(39, 'Estrella', NULL, '/back/uploads/img/cuore63b31f7ed3b120.83327933.png', '2023-01-02 19:16:31'),
(40, 'Estrella', NULL, '/back/uploads/vid/cuore63b31f7ed63609.12835184.mp4', '2023-01-02 19:16:31'),
(41, 'Erick', NULL, '/back/uploads/img/cuore63b321365f4c92.68533147.png', '2023-01-02 19:23:50'),
(42, 'Erick', NULL, '/back/uploads/vid/cuore63b3213660c180.23095511.mp4', '2023-01-02 19:23:50'),
(43, 'Gadea', NULL, '/back/uploads/img/cuore63b3251aaf12e1.62508165.png', '2023-01-02 19:40:26'),
(44, 'Gadea', NULL, '/back/uploads/vid/cuore63b3251ab0c095.84138302.mp4', '2023-01-02 19:40:26'),
(45, 'Salma', NULL, '/back/uploads/img/cuore63b32a8eab9be9.71103199.png', '2023-01-02 20:03:42'),
(46, 'Salma', NULL, '/back/uploads/vid/cuore63b32a8eae0a36.79157248.mp4', '2023-01-02 20:03:42'),
(47, 'Andrea', NULL, '/back/uploads/img/cuore63b33096912492.37850927.png', '2023-01-02 20:29:26'),
(48, 'Andrea', NULL, '/back/uploads/vid/cuore63b330969402d4.38230969.mp4', '2023-01-02 20:29:26'),
(49, 'Steve', NULL, '/back/uploads/img/cuore63b332145b2ed2.29951672.png', '2023-01-02 20:35:48'),
(50, 'Steve', NULL, '/back/uploads/vid/cuore63b332145cbd29.12222211.mp4', '2023-01-02 20:35:48'),
(51, 'Leo', NULL, '/back/uploads/img/cuore63b333c1085a34.46310556.png', '2023-01-02 20:42:57'),
(52, 'Leo', NULL, '/back/uploads/vid/cuore63b333c10ac759.57782332.mp4', '2023-01-02 20:42:57'),
(53, 'MarSophie', NULL, '/back/uploads/img/cuore63b3360f64d344.35632734.png', '2023-01-02 20:52:47'),
(54, 'MarSophie', NULL, '/back/uploads/vid/cuore63b3360f669d55.13477303.mp4', '2023-01-02 20:52:47'),
(55, 'Peter', NULL, '/back/uploads/img/cuore63b33879367b04.44249253.png', '2023-01-02 21:03:05'),
(56, 'Peter', NULL, '/back/uploads/vid/cuore63b33879382f60.31078235.mp4', '2023-01-02 21:03:05'),
(57, 'Maria', NULL, '/back/uploads/img/cuore63b33a3a781601.68960154.png', '2023-01-02 21:10:34'),
(58, 'Maria', NULL, '/back/uploads/vid/cuore63b33a3a79b659.11468360.mp4', '2023-01-02 21:10:34'),
(59, 'Jade', NULL, '/back/uploads/img/cuore63b33bb10e0524.05639857.png', '2023-01-02 21:16:49'),
(60, 'Jade', NULL, '/back/uploads/vid/cuore63b33bb10f8874.04965506.mp4', '2023-01-02 21:16:49'),
(61, 'Josu', NULL, '/back/uploads/img/cuore63b33d88de11d3.48002080.png', '2023-01-02 21:24:41'),
(62, 'Josu', NULL, '/back/uploads/vid/cuore63b33d88dfde57.43524880.mp4', '2023-01-02 21:24:41'),
(63, 'ruben', NULL, '/back/uploads/img/cuore63b9c494bd5205.79898890.jpg', '2023-01-07 20:14:28'),
(64, 'ruben', NULL, '/back/uploads/vid/cuore63b9c494bdb753.57335052.mp4', '2023-01-07 20:14:28'),
(75, 'Sara', '', '/back/uploads/vid/cuore63bd6bd02f3991.36535005.mp4', '2023-01-10 14:44:48'),
(76, 'Sara', 'Currando', '/back/uploads/img/cuore63bd6f8a2a8b54.05918260.jpg', '2023-01-10 15:00:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reacciones`
--

CREATE TABLE `reacciones` (
  `id_publicacion` int(10) UNSIGNED NOT NULL,
  `nick_reaccion` varchar(50) NOT NULL,
  `labios` tinyint(1) NOT NULL DEFAULT 0,
  `pulgar` tinyint(1) NOT NULL DEFAULT 0,
  `fuego` tinyint(1) NOT NULL DEFAULT 0,
  `corazon` tinyint(1) NOT NULL DEFAULT 0,
  `dislike` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reacciones`
--

INSERT INTO `reacciones` (`id_publicacion`, `nick_reaccion`, `labios`, `pulgar`, `fuego`, `corazon`, `dislike`) VALUES
(11, 'Lolo', 0, 0, 1, 1, 0),
(11, 'Manuel', 0, 0, 1, 0, 0),
(11, 'Steve', 0, 0, 1, 0, 0),
(13, 'Lolo', 1, 0, 0, 0, 0),
(13, 'Manuel', 0, 0, 0, 0, 0),
(13, 'Steve', 0, 1, 1, 0, 0),
(15, 'Lolo', 1, 1, 1, 1, 1),
(15, 'Manuel', 0, 0, 1, 0, 0),
(15, 'ruben', 0, 0, 1, 0, 1),
(15, 'Sergio', 0, 0, 1, 0, 0),
(19, 'Anthony', 0, 0, 0, 1, 0),
(19, 'Lolo', 0, 1, 0, 0, 0),
(19, 'Steve', 1, 0, 1, 1, 0),
(23, 'Anthony', 0, 0, 1, 0, 0),
(23, 'Lolo', 0, 1, 0, 0, 0),
(25, 'Lolo', 0, 0, 0, 0, 1),
(27, 'Anthony', 1, 0, 0, 0, 0),
(27, 'Lolo', 0, 0, 0, 1, 0),
(35, 'Anthony', 0, 1, 1, 1, 0),
(35, 'Lolo', 0, 0, 0, 0, 1),
(35, 'Manuel', 0, 1, 0, 0, 0),
(35, 'Sergio', 0, 1, 0, 0, 0),
(35, 'Steve', 0, 1, 0, 0, 0),
(39, 'Andrea', 0, 1, 0, 1, 0),
(39, 'Leo', 1, 1, 0, 0, 0),
(53, 'Lolo', 0, 0, 0, 0, 1),
(57, 'Lolo', 0, 1, 0, 0, 0),
(59, 'Andrea', 0, 0, 1, 0, 0),
(59, 'Lolo', 0, 0, 1, 1, 0),
(59, 'Steve', 1, 1, 1, 0, 0),
(63, 'ruben', 0, 0, 1, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexos`
--

CREATE TABLE `sexos` (
  `id` int(10) UNSIGNED NOT NULL,
  `sexo` varchar(19) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sexos`
--

INSERT INTO `sexos` (`id`, `sexo`) VALUES
(1, 'Hombre'),
(2, 'Mujer'),
(3, 'Intersexo hombre'),
(4, 'Intersexo mujer'),
(5, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nick` varchar(50) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `email` varchar(150) NOT NULL,
  `sexo` int(10) UNSIGNED NOT NULL,
  `perfil_busqueda` int(10) UNSIGNED NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `video_present` varchar(255) NOT NULL,
  `clave` varchar(60) NOT NULL,
  `ubicacion` point NOT NULL,
  `premium` tinyint(1) NOT NULL DEFAULT 0,
  `superadmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nick`, `nombre`, `fecha_nacimiento`, `email`, `sexo`, `perfil_busqueda`, `imagen`, `video_present`, `clave`, `ubicacion`, `premium`, `superadmin`) VALUES
('Andrea', 'Andreita', '1989-04-18', 'andrea26@hotmail.com', 5, 11, '/back/uploads/img/cuore63b330968c9d64.30316133.png', '/back/uploads/vid/cuore63b33096935bf3.99004344.mp4', '$2y$10$1j2JrSvHG2Hxm.2xikDDdej2Bnxqa0dzgCJGAmqJ/MuHnbNylhS0C', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Anthony', 'Anthony', '1995-01-03', 'anthony4@hotmail.com', 1, 11, '/back/uploads/img/cuore63b027edb5fac3.94000334.png', '/back/uploads/vid/cuore63b027edb73c85.86013341.mp4', '$2y$10$SGtE4RJkHZW1BxMbskVdZer2cJQLwTosh14fEE8f8lVyVhLXKlz.a', 0x0000000001010000008fb81160a2214440c701aa6ee4e00ec0, 1, 0),
('Beatriz', 'Bea', '1958-03-15', 'bea18@hotmail.com', 2, 1, '/back/uploads/img/cuore63b175d18efd90.48901797.png', '/back/uploads/vid/cuore63b175d1925630.09339121.mp4', '$2y$10$LgcSd2jgwJ/vZPj9hGznC.jwE1stFLZpsX/mvfk.102YEuXDVyGmG', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 1, 0),
('Dalia', 'Daliiii', '1980-12-30', 'dalia9@hotmail.com', 2, 1, '/back/uploads/img/cuore63b07024168937.82304923.png', '/back/uploads/vid/cuore63b07024180de1.93067409.mp4', '$2y$10$XKK/cp7MbmWu4qQeH7egSeF5h4MkId9kpiItOOsrxRabtzgtWq/W.', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 1, 0),
('Daniel', 'Daniel F', '2004-12-30', 'daniel2@hotmail.com', 5, 11, '/back/uploads/img/cuore63b020330f10b4.86242774.png', '/back/uploads/vid/cuore63b0203310b7d3.11011217.mp4', '$2y$10$RkDToJSTc2Lq95OeefRASOfS29l1yhjZ03pS7QurgLRh9UZqupLeO', 0x0000000001010000003c5e9214a2214440a930b610e4e00ec0, 1, 0),
('Erick', 'Eerick', '1998-12-31', 'erick23@hotmail.com', 1, 11, '/back/uploads/img/cuore63b321365e8645.54155708.png', '/back/uploads/vid/cuore63b321366021f4.60011992.mp4', '$2y$10$ZdddaySwNY8fqOySX1cEU.bOZ99bUzEWabKu6sSAUFU6R.xjiPGdy', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Estrella', 'Estrellada', '1996-01-03', 'estrella21@hotmail.com', 2, 1, '/back/uploads/img/cuore63b31f7ed2b291.12011258.png', '/back/uploads/vid/cuore63b31f7ed53cd3.07834341.mp4', '$2y$10$Una38ZAmEkPoRWZS4rykJeLRBLU09L2MDKPPhD8LGEN6/A0IYPY1q', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Eva', 'Eva Leon', '2000-10-10', 'eva12@hotmail.com', 4, 1, '/back/uploads/img/cuore63b0723f1a1c16.88598419.png', '/back/uploads/vid/cuore63b0723f1bd934.66524978.mp4', '$2y$10$hfvqTxCBWlGzQUHLib5ADuwZAvByIjG0gizdAlyjuQe6SVikEDFXe', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 1, 0),
('Fede', 'Federico', '1960-12-31', 'fede16@hotmail.com', 3, 1, '/back/uploads/img/cuore63b173a35dff57.49686200.png', '/back/uploads/vid/cuore63b173a35f9224.11632746.mp4', '$2y$10$2ANRq.6tfwP1n.YPLc5PbeBLoWjVchGgzfD44t1bE43MMU41kbk86', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 1, 0),
('Gadea', 'Gade', '2000-01-04', 'gadea24@hotmail.com', 2, 11, '/back/uploads/img/cuore63b3251aae0053.54827868.png', '/back/uploads/vid/cuore63b3251ab021f1.90104760.mp4', '$2y$10$VNeeGK/PinfISQc2Zd8v2.Ihm7DGxSbDcx.SJcmOPaREXg0udgy4a', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Iris', 'Iris', '2003-01-05', 'iris5@hotmail.com', 2, 1, '/back/uploads/img/cuore63b0452f569401.96401413.png', '/back/uploads/vid/cuore63b0452f5915f9.56226704.mp4', '$2y$10$P84zp7NjfHPGu8tKnhs9e.lquoM5LR5k.OiCf1WmHZf5r29e0N9kO', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 1, 0),
('Jade', 'Jade', '1981-09-10', 'jade32@hotmail.com', 2, 11, '/back/uploads/img/cuore63b33bb10d5fa0.62119177.png', '/back/uploads/vid/cuore63b33bb10ee121.72157256.mp4', '$2y$10$Dn0AJ471bxYNJyvJkpgGfO8Q3RAG/yQ/rUEIOS1tRpBUU5i66mkSS', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Josu', 'Josué', '1976-09-10', 'josu34@hotmail.com', 1, 2, '/back/uploads/img/cuore63b33d88dd6e41.12158465.png', '/back/uploads/vid/cuore63b33d88df10c1.86015841.mp4', '$2y$10$hqaiinTQ0DerWAcoli00nOuulUCNY82RXCx0suDI0AMepYpcVeFhy', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Leo', 'Leo', '1970-08-16', 'leo28@hotmail.com', 1, 2, '/back/uploads/img/cuore63b333c107b7e5.27655798.png', '/back/uploads/vid/cuore63b333c109aed2.55345883.mp4', '$2y$10$cQ7R38nOUuoRHRHQXLYBq.WXs9EVa.P752AzK4e47SCYzg5F4IMDe', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Lolo', 'Lolo', '1948-12-31', 'lolo17@hotmail.com', 1, 11, '/back/uploads/img/cuore63b1749738aca3.01767209.png', '/back/uploads/vid/cuore63b174973af466.48875474.mp4', '$2y$10$lrKtJBpBRmUnFIffX5MJ/uQZ1BmpSIpAFO1MNyyPyh/ck91MsPMgu', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 1, 0),
('Lucia', 'Lu', '1951-05-22', 'lucia14@hotmail.com', 2, 1, '/back/uploads/img/cuore63b079723a28b6.26979050.png', '/back/uploads/vid/cuore63b079723c0af6.46346392.mp4', '$2y$10$T/TajnVX4pCVWfk1NQFUn./zo4nlCdcADtskHFkUHQxBHALL1HgAW', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 1, 0),
('Manuel', 'Manu', '1950-10-10', 'manuel14@hotmail.com', 1, 2, '/back/uploads/img/cuore63b1714b4b3952.23668994.png', '/back/uploads/vid/cuore63b1714b4cdf01.35366015.mp4', '$2y$10$D5e/kCtN5X5Bfqn7mjlfwenjBSfnQUnb3WUfPsL4GupO52yIHA392', 0x000000000101000000ea241782a021444009b0b1a141e10ec0, 1, 0),
('Maria', 'Mari', '1973-12-01', 'maria31@hotmail.com', 2, 1, '/back/uploads/img/cuore63b33a3a777342.39910522.png', '/back/uploads/vid/cuore63b33a3a791339.42373327.mp4', '$2y$10$3vXBbeeGGdwZbJzVqvTaTuytMgEeSCCHIdJwXYG4idlSOmNyo9VY2', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Maribel', 'Maribel', '1960-08-08', 'maribel13@hotmail.com', 4, 1, '/back/uploads/img/cuore63b072e24fd030.99938663.png', '/back/uploads/vid/cuore63b072e251c118.67191728.mp4', '$2y$10$HNVph3DaeQ1Eov5/sqAfY.KPmVkRbmQOTNwtB4u9lqA2qwrCAr2pu', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 1, 0),
('MarSophie', 'Mar y Sofia', '1988-12-31', 'marsophie29@hotmail.com', 5, 11, '/back/uploads/img/cuore63b3360f643643.25050861.png', '/back/uploads/vid/cuore63b3360f65fc00.24566144.mp4', '$2y$10$cjppZBIOGLMXGt1337oQKeG8YEnDYjfecmI7atHLjhzi9GRIG2keu', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Mia', 'Mia', '1998-01-02', 'mia6@hotmail.com', 2, 2, '/back/uploads/img/cuore63b046ad37a105.78349197.png', '/back/uploads/vid/cuore63b046ad398ef1.08921261.mp4', '$2y$10$LIo0ADKT9iJeYzOm7ms7o.wR9NMZdJn020ChZ8fl3BcHmmIxNiew2', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 1, 0),
('Peter', 'Peteeeeeer', '1980-12-31', 'peter30@hotmail.com', 1, 11, '/back/uploads/img/cuore63b3387935bda1.27329023.png', '/back/uploads/vid/cuore63b33879376f05.40862372.mp4', '$2y$10$MtqbWdg41UQSCosR45ECz.AF4TF8UehtC6dcR6hA.oV.7tuRKwBZG', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('ruben', NULL, '1995-07-19', 'ruben@gmail.com', 1, 2, '/back/uploads/img/cuore63b9c494bd3301.90313688.jpg', '/back/uploads/vid/cuore63b9c494bd86f7.28312332.mp4', '$2y$10$phkFXn4Lyro8Clq5QGx7z.29Tbxcz18crD//u2sexAssN8r0Mal56', 0x000000000101000000270120ddbe254440c5a39e4f2e570ec0, 1, 1),
('Salma', 'Saalma', '1993-11-05', 'salma25@hotmail.com', 5, 11, '/back/uploads/img/cuore63b32a8eaafbb9.12851841.png', '/back/uploads/vid/cuore63b32a8ead5fa2.00701329.mp4', '$2y$10$Plx6XN4p5qulokSYjLr5LOc046eSkWWWo7rAX8DN4ZMov6seKddnu', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0),
('Sara', 'Sara', '1981-10-15', 'saraortigosa8@hotmail.com', 2, 11, '/back/uploads/img/cuore63bd704d0fdfd0.81713160.jpg', '/back/uploads/vid/cuore63aed654cbf5c5.58954584.mp4', '$2y$10$AfhWgENKNXYxygu3MtQ/Oe8lUlr4fV0xXbQWzMB2rxNSif7vRhPqK', 0x0000000001010000005e70bcf1a4204440a64b5a4cc7d70ec0, 1, 0),
('Saul', 'Saul', '1989-12-30', 'saul10@hotmail.com', 1, 1, '/back/uploads/img/cuore63b0710e117645.73529306.png', '/back/uploads/vid/cuore63b0710e154d64.37345929.mp4', '$2y$10$1YhF1AYZpLsn8vPl9VhbMuqVWgzChb/34EuRO0PLbLPxBI6x0IDJa', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 1, 0),
('Sergio', 'Sergi', '2003-01-08', 'sergio8@hotmail.com', 1, 11, '/back/uploads/img/cuore63b04a29e6d506.31490635.png', '/back/uploads/vid/cuore63b04a29e824a8.52585825.mp4', '$2y$10$322dxbiiDE4p3fDo/xbc..M7SWcoxR/q9cs/fMR7nJl.6yS9muDsC', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 1, 0),
('Sofia', 'Sofiii', '1995-01-08', 'sofia7@hotmail.com', 2, 2, '/back/uploads/img/cuore63b047fd9ddf50.39262059.png', '/back/uploads/vid/cuore63b047fd9f8548.79146692.mp4', '$2y$10$p5oqrtrn9hxdBVjxLK98kOWtljqsonzEmvlQknF9ti1q3WhGWA2P2', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 1, 0),
('Steve', 'Steve', '1978-03-18', 'steve27@hotmail.com', 1, 11, '/back/uploads/img/cuore63b332145a8e77.10703848.png', '/back/uploads/vid/cuore63b332145c1b27.51204428.mp4', '$2y$10$y7oCpohzN0nSSowFanslM.Wz10ov3hnOhAfJoXKTIm.vNbM/.d1ba', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nick` varchar(50) DEFAULT NULL,
  `ip` varchar(15) NOT NULL,
  `fecha` date NOT NULL,
  `contador` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`id`, `nick`, `ip`, `fecha`, `contador`) VALUES
(1, 'Sara', '::1', '2022-12-30', 9),
(2, 'Sara', '::1', '2022-12-31', 1),
(3, 'Daniel', '::1', '2022-12-31', 1),
(4, NULL, '::1', '2022-12-31', 1),
(5, NULL, '127.0.0.1', '2022-12-31', 1),
(6, 'Sergio', '127.0.0.1', '2022-12-31', 1),
(7, 'Sara', '127.0.0.1', '2022-12-31', 1),
(8, 'Lucia', '127.0.0.1', '2023-01-01', 1),
(9, 'Saul', '127.0.0.1', '2023-01-01', 1),
(10, 'Eva', '127.0.0.1', '2023-01-01', 1),
(11, 'Maribel', '127.0.0.1', '2023-01-01', 1),
(12, 'Manuel', '127.0.0.1', '2023-01-01', 1),
(13, 'Sara', '127.0.0.1', '2023-01-02', 1),
(14, 'Andrea', '127.0.0.1', '2023-01-02', 1),
(15, 'Sara', '::1', '2023-01-03', 2),
(16, 'Sara', '127.0.0.1', '2023-01-03', 4),
(17, 'MarSophie', '::1', '2023-01-03', 1),
(18, 'Daniel', '127.0.0.1', '2023-01-03', 2),
(19, 'ruben', '127.0.0.1', '2023-01-07', 21),
(20, NULL, '::1', '2023-01-07', 2),
(21, NULL, '::1', '2023-01-07', 1),
(22, 'ruben', '127.0.0.1', '2023-01-08', 19),
(23, 'ruben', '::1', '2023-01-07', 1),
(24, 'ruben', '::1', '2023-01-08', 2),
(25, NULL, '127.0.0.1', '2023-01-08', 2),
(26, NULL, '::1', '2023-01-08', 2),
(27, NULL, '127.0.0.1', '2023-01-08', 1),
(28, NULL, '::1', '2023-01-08', 1),
(29, NULL, '::1', '2023-01-08', 1),
(30, NULL, '127.0.0.1', '2023-01-08', 4),
(31, 'ruben', '127.0.0.1', '2023-01-09', 2),
(32, NULL, '::1', '2023-01-09', 1),
(33, 'Andrea', '127.0.0.1', '2023-01-10', 3),
(34, 'Anthony', '127.0.0.1', '2023-01-10', 1),
(35, 'Beatriz', '127.0.0.1', '2023-01-10', 2),
(36, 'Andrea', '::1', '2023-01-10', 2),
(37, 'Anthony', '::1', '2023-01-10', 2),
(38, 'Beatriz', '::1', '2023-01-10', 2),
(39, 'Dalia', '::1', '2023-01-10', 1),
(40, 'Daniel', '::1', '2023-01-10', 2),
(41, NULL, '::1', '2023-01-10', 1),
(42, 'Erick', '::1', '2023-01-10', 1),
(43, 'Estrella', '::1', '2023-01-10', 1),
(44, 'Eva', '::1', '2023-01-10', 1),
(45, 'Fede', '::1', '2023-01-10', 2),
(46, 'Gadea', '::1', '2023-01-10', 2),
(47, 'Iris', '::1', '2023-01-10', 1),
(48, 'Jade', '::1', '2023-01-10', 4),
(49, 'Josu', '::1', '2023-01-10', 1),
(50, 'Leo', '::1', '2023-01-10', 2),
(51, 'Lolo', '::1', '2023-01-10', 2),
(52, 'Lucia', '::1', '2023-01-10', 1),
(53, 'Manuel', '::1', '2023-01-10', 2),
(54, 'Maria', '::1', '2023-01-10', 1),
(55, 'Maribel', '::1', '2023-01-10', 1),
(56, 'MarSophie', '::1', '2023-01-10', 1),
(57, 'Mia', '::1', '2023-01-10', 1),
(58, 'Peter', '::1', '2023-01-10', 6),
(59, 'Salma', '::1', '2023-01-10', 1),
(60, 'Sara', '::1', '2023-01-10', 6),
(61, 'Saul', '::1', '2023-01-10', 1),
(62, 'Sergio', '::1', '2023-01-10', 2),
(63, 'Sofia', '::1', '2023-01-10', 1),
(64, 'Steve', '::1', '2023-01-10', 2),
(65, NULL, '127.0.0.1', '2023-01-10', 1),
(66, 'ruben', '127.0.0.1', '2023-01-10', 1),
(67, 'Peter', '127.0.0.1', '2023-01-10', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `busquedas`
--
ALTER TABLE `busquedas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_comentarios_usuarios` (`nick_comenta`),
  ADD KEY `FK_comentarios_publicaciones` (`id_publicacion`);

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`usuario_origen`,`usuario_destino`),
  ADD KEY `FK_usuario_destino_usuarios` (`usuario_destino`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`idMensaje`),
  ADD KEY `FK_mensajes_usuarios_origen` (`nick_origen`),
  ADD KEY `FK_mensajes_usuarios_destino` (`nick_destino`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_publicaciones_usuarios` (`nick_publicacion`);

--
-- Indices de la tabla `reacciones`
--
ALTER TABLE `reacciones`
  ADD PRIMARY KEY (`id_publicacion`,`nick_reaccion`),
  ADD KEY `FK_reacciones_usuarios` (`nick_reaccion`);

--
-- Indices de la tabla `sexos`
--
ALTER TABLE `sexos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`nick`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `FK_usarios_sexos` (`sexo`),
  ADD KEY `FK_usarios_busquedas` (`perfil_busqueda`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_visitas_usuarios` (`nick`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `busquedas`
--
ALTER TABLE `busquedas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `idMensaje` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `sexos`
--
ALTER TABLE `sexos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `FK_comentarios_publicaciones` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_comentarios_usuarios` FOREIGN KEY (`nick_comenta`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `FK_usuario_destino_usuarios` FOREIGN KEY (`usuario_destino`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_usuario_origen_usuarios` FOREIGN KEY (`usuario_origen`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `FK_mensajes_usuarios_destino` FOREIGN KEY (`nick_destino`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_mensajes_usuarios_origen` FOREIGN KEY (`nick_origen`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `FK_publicaciones_usuarios` FOREIGN KEY (`nick_publicacion`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reacciones`
--
ALTER TABLE `reacciones`
  ADD CONSTRAINT `FK_reacciones_publicaciones` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_reacciones_usuarios` FOREIGN KEY (`nick_reaccion`) REFERENCES `usuarios` (`nick`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_usarios_busquedas` FOREIGN KEY (`perfil_busqueda`) REFERENCES `busquedas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_usarios_sexos` FOREIGN KEY (`sexo`) REFERENCES `sexos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD CONSTRAINT `FK_visitas_usuarios` FOREIGN KEY (`nick`) REFERENCES `usuarios` (`nick`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
