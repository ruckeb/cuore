-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-01-2023 a las 18:59:00
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS Cuore;
USE Cuore;


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
(2, 'Sara', NULL, '/back/uploads/vid/cuore63aed654cc3a98.79519834.mp4', '2022-12-30 13:15:16'),
(5, 'Daniel', NULL, '/back/uploads/img/cuore63b020330f8665.78766251.png', '2022-12-31 12:42:43'),
(6, 'Daniel', NULL, '/back/uploads/vid/cuore63b020331155f7.52395112.mp4', '2022-12-31 12:42:43'),
(7, 'Fran', NULL, '/back/uploads/img/cuore63b023a388e174.74681108.png', '2022-12-31 12:57:23'),
(8, 'Fran', NULL, '/back/uploads/vid/cuore63b023a38ac408.44468243.mp4', '2022-12-31 12:57:23'),
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
(37, 'Dante', NULL, '/back/uploads/img/cuore63b176d2df37e3.34934845.png', '2023-01-01 13:04:35'),
(38, 'Dante', NULL, '/back/uploads/vid/cuore63b176d2e08d91.02745082.mp4', '2023-01-01 13:04:35'),
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
(62, 'Josu', NULL, '/back/uploads/vid/cuore63b33d88dfde57.43524880.mp4', '2023-01-02 21:24:41');

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

INSERT INTO `usuarios` (`nick`, `nombre`, `fecha_nacimiento`, `email`, `sexo`, `perfil_busqueda`, `imagen`, `video_present`, `clave`, `ubicacion`, `premium`) VALUES
('Andrea', NULL, '1989-04-18', 'andrea26@hotmail.com', 5, 11, '/back/uploads/img/cuore63b330968c9d64.30316133.png', '/back/uploads/vid/cuore63b33096935bf3.99004344.mp4', '$2y$10$1j2JrSvHG2Hxm.2xikDDdej2Bnxqa0dzgCJGAmqJ/MuHnbNylhS0C', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Anthony', NULL, '1995-01-03', 'anthony4@hotmail.com', 1, 11, '/back/uploads/img/cuore63b027edb5fac3.94000334.png', '/back/uploads/vid/cuore63b027edb73c85.86013341.mp4', '$2y$10$SGtE4RJkHZW1BxMbskVdZer2cJQLwTosh14fEE8f8lVyVhLXKlz.a', 0x0000000001010000008fb81160a2214440c701aa6ee4e00ec0, 0),
('Beatriz', NULL, '1958-03-15', 'bea18@hotmail.com', 2, 1, '/back/uploads/img/cuore63b175d18efd90.48901797.png', '/back/uploads/vid/cuore63b175d1925630.09339121.mp4', '$2y$10$LgcSd2jgwJ/vZPj9hGznC.jwE1stFLZpsX/mvfk.102YEuXDVyGmG', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 0),
('Dalia', NULL, '1980-12-30', 'dalia9@hotmail.com', 2, 1, '/back/uploads/img/cuore63b07024168937.82304923.png', '/back/uploads/vid/cuore63b07024180de1.93067409.mp4', '$2y$10$XKK/cp7MbmWu4qQeH7egSeF5h4MkId9kpiItOOsrxRabtzgtWq/W.', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 0),
('Daniel', NULL, '2004-12-30', 'daniel2@hotmail.com', 5, 11, '/back/uploads/img/cuore63b020330f10b4.86242774.png', '/back/uploads/vid/cuore63b0203310b7d3.11011217.mp4', '$2y$10$RkDToJSTc2Lq95OeefRASOfS29l1yhjZ03pS7QurgLRh9UZqupLeO', 0x0000000001010000003c5e9214a2214440a930b610e4e00ec0, 0),
('Dante', NULL, '1993-08-08', 'dante19@hotmail.com', 3, 11, '/back/uploads/img/cuore63b176d2de6c06.06582051.png', '/back/uploads/vid/cuore63b176d2dfd982.14037905.mp4', '$2y$10$BYdJCTvFvXJ36W8j/oF6zOtSvwD9EpXtBdKdmcBDyXGqtGhs9.fou', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 0),
('Erick', NULL, '1998-12-31', 'erick23@hotmail.com', 1, 11, '/back/uploads/img/cuore63b321365e8645.54155708.png', '/back/uploads/vid/cuore63b321366021f4.60011992.mp4', '$2y$10$ZdddaySwNY8fqOySX1cEU.bOZ99bUzEWabKu6sSAUFU6R.xjiPGdy', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Estrella', NULL, '1996-01-03', 'estrella21@hotmail.com', 2, 1, '/back/uploads/img/cuore63b31f7ed2b291.12011258.png', '/back/uploads/vid/cuore63b31f7ed53cd3.07834341.mp4', '$2y$10$Una38ZAmEkPoRWZS4rykJeLRBLU09L2MDKPPhD8LGEN6/A0IYPY1q', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Eva', NULL, '2000-10-10', 'eva12@hotmail.com', 4, 1, '/back/uploads/img/cuore63b0723f1a1c16.88598419.png', '/back/uploads/vid/cuore63b0723f1bd934.66524978.mp4', '$2y$10$hfvqTxCBWlGzQUHLib5ADuwZAvByIjG0gizdAlyjuQe6SVikEDFXe', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 0),
('Fede', NULL, '1960-12-31', 'fede16@hotmail.com', 3, 1, '/back/uploads/img/cuore63b173a35dff57.49686200.png', '/back/uploads/vid/cuore63b173a35f9224.11632746.mp4', '$2y$10$2ANRq.6tfwP1n.YPLc5PbeBLoWjVchGgzfD44t1bE43MMU41kbk86', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 0),
('Fran', NULL, '1993-01-01', 'fran3@hotmail.com', 1, 11, '/back/uploads/img/cuore63b023a38863f5.16418523.png', '/back/uploads/vid/cuore63b023a38a4691.66906047.mp4', '$2y$10$/ojPVCX2oGBUEUW4/3U5.eev4eITqr9XIkzpJw8070o0Kp/.g7irq', 0x0000000001010000005e70bcf1a4204440a64b5a4cc7d70ec0, 0),
('Gadea', NULL, '2000-01-04', 'gadea24@hotmail.com', 2, 11, '/back/uploads/img/cuore63b3251aae0053.54827868.png', '/back/uploads/vid/cuore63b3251ab021f1.90104760.mp4', '$2y$10$VNeeGK/PinfISQc2Zd8v2.Ihm7DGxSbDcx.SJcmOPaREXg0udgy4a', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Iris', NULL, '2003-01-05', 'iris5@hotmail.com', 2, 1, '/back/uploads/img/cuore63b0452f569401.96401413.png', '/back/uploads/vid/cuore63b0452f5915f9.56226704.mp4', '$2y$10$P84zp7NjfHPGu8tKnhs9e.lquoM5LR5k.OiCf1WmHZf5r29e0N9kO', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 0),
('Jade', NULL, '1981-09-10', 'jade32@hotmail.com', 2, 11, '/back/uploads/img/cuore63b33bb10d5fa0.62119177.png', '/back/uploads/vid/cuore63b33bb10ee121.72157256.mp4', '$2y$10$Dn0AJ471bxYNJyvJkpgGfO8Q3RAG/yQ/rUEIOS1tRpBUU5i66mkSS', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Josu', NULL, '1976-09-10', 'josu34@hotmail.com', 1, 2, '/back/uploads/img/cuore63b33d88dd6e41.12158465.png', '/back/uploads/vid/cuore63b33d88df10c1.86015841.mp4', '$2y$10$hqaiinTQ0DerWAcoli00nOuulUCNY82RXCx0suDI0AMepYpcVeFhy', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Leo', NULL, '1970-08-16', 'leo28@hotmail.com', 1, 2, '/back/uploads/img/cuore63b333c107b7e5.27655798.png', '/back/uploads/vid/cuore63b333c109aed2.55345883.mp4', '$2y$10$cQ7R38nOUuoRHRHQXLYBq.WXs9EVa.P752AzK4e47SCYzg5F4IMDe', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Lolo', NULL, '1948-12-31', 'lolo17@hotmail.com', 1, 11, '/back/uploads/img/cuore63b1749738aca3.01767209.png', '/back/uploads/vid/cuore63b174973af466.48875474.mp4', '$2y$10$lrKtJBpBRmUnFIffX5MJ/uQZ1BmpSIpAFO1MNyyPyh/ck91MsPMgu', 0x0000000001010000008562e779a0214440536ed7ce44e10ec0, 0),
('Lucia', NULL, '1951-05-22', 'lucia14@hotmail.com', 2, 1, '/back/uploads/img/cuore63b079723a28b6.26979050.png', '/back/uploads/vid/cuore63b079723c0af6.46346392.mp4', '$2y$10$T/TajnVX4pCVWfk1NQFUn./zo4nlCdcADtskHFkUHQxBHALL1HgAW', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 0),
('Manuel', NULL, '1950-10-10', 'manuel14@hotmail.com', 1, 2, '/back/uploads/img/cuore63b1714b4b3952.23668994.png', '/back/uploads/vid/cuore63b1714b4cdf01.35366015.mp4', '$2y$10$D5e/kCtN5X5Bfqn7mjlfwenjBSfnQUnb3WUfPsL4GupO52yIHA392', 0x000000000101000000ea241782a021444009b0b1a141e10ec0, 0),
('Maria', NULL, '1973-12-01', 'maria31@hotmail.com', 2, 1, '/back/uploads/img/cuore63b33a3a777342.39910522.png', '/back/uploads/vid/cuore63b33a3a791339.42373327.mp4', '$2y$10$3vXBbeeGGdwZbJzVqvTaTuytMgEeSCCHIdJwXYG4idlSOmNyo9VY2', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Maribel', NULL, '1960-08-08', 'maribel13@hotmail.com', 4, 1, '/back/uploads/img/cuore63b072e24fd030.99938663.png', '/back/uploads/vid/cuore63b072e251c118.67191728.mp4', '$2y$10$HNVph3DaeQ1Eov5/sqAfY.KPmVkRbmQOTNwtB4u9lqA2qwrCAr2pu', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 0),
('MarSophie', NULL, '1988-12-31', 'marsophie29@hotmail.com', 5, 11, '/back/uploads/img/cuore63b3360f643643.25050861.png', '/back/uploads/vid/cuore63b3360f65fc00.24566144.mp4', '$2y$10$cjppZBIOGLMXGt1337oQKeG8YEnDYjfecmI7atHLjhzi9GRIG2keu', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Mia', NULL, '1998-01-02', 'mia6@hotmail.com', 2, 2, '/back/uploads/img/cuore63b046ad37a105.78349197.png', '/back/uploads/vid/cuore63b046ad398ef1.08921261.mp4', '$2y$10$LIo0ADKT9iJeYzOm7ms7o.wR9NMZdJn020ChZ8fl3BcHmmIxNiew2', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 0),
('Peter', NULL, '1980-12-31', 'peter30@hotmail.com', 1, 11, '/back/uploads/img/cuore63b3387935bda1.27329023.png', '/back/uploads/vid/cuore63b33879376f05.40862372.mp4', '$2y$10$MtqbWdg41UQSCosR45ECz.AF4TF8UehtC6dcR6hA.oV.7tuRKwBZG', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Salma', NULL, '1993-11-05', 'salma25@hotmail.com', 5, 11, '/back/uploads/img/cuore63b32a8eaafbb9.12851841.png', '/back/uploads/vid/cuore63b32a8ead5fa2.00701329.mp4', '$2y$10$Plx6XN4p5qulokSYjLr5LOc046eSkWWWo7rAX8DN4ZMov6seKddnu', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0),
('Sara', NULL, '1981-10-15', 'saraortigosa8@hotmail.com', 2, 11, '/back/uploads/img/cuore63aed654c9fe08.41772623.jpg', '/back/uploads/vid/cuore63aed654cbf5c5.58954584.mp4', '$2y$10$AfhWgENKNXYxygu3MtQ/Oe8lUlr4fV0xXbQWzMB2rxNSif7vRhPqK', 0x0000000001010000005e70bcf1a4204440a64b5a4cc7d70ec0, 0),
('Saul', NULL, '1989-12-30', 'saul10@hotmail.com', 1, 1, '/back/uploads/img/cuore63b0710e117645.73529306.png', '/back/uploads/vid/cuore63b0710e154d64.37345929.mp4', '$2y$10$1YhF1AYZpLsn8vPl9VhbMuqVWgzChb/34EuRO0PLbLPxBI6x0IDJa', 0x00000000010100000037c3f965a02144409fb44c5748e10ec0, 0),
('Sergio', NULL, '2003-01-08', 'sergio8@hotmail.com', 1, 11, '/back/uploads/img/cuore63b04a29e6d506.31490635.png', '/back/uploads/vid/cuore63b04a29e824a8.52585825.mp4', '$2y$10$322dxbiiDE4p3fDo/xbc..M7SWcoxR/q9cs/fMR7nJl.6yS9muDsC', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 0),
('Sofia', NULL, '1995-01-08', 'sofia7@hotmail.com', 2, 2, '/back/uploads/img/cuore63b047fd9ddf50.39262059.png', '/back/uploads/vid/cuore63b047fd9f8548.79146692.mp4', '$2y$10$p5oqrtrn9hxdBVjxLK98kOWtljqsonzEmvlQknF9ti1q3WhGWA2P2', 0x0000000001010000005a476269a0214440532d037f40e10ec0, 0),
('Steve', NULL, '1978-03-18', 'steve27@hotmail.com', 1, 11, '/back/uploads/img/cuore63b332145a8e77.10703848.png', '/back/uploads/vid/cuore63b332145c1b27.51204428.mp4', '$2y$10$y7oCpohzN0nSSowFanslM.Wz10ov3hnOhAfJoXKTIm.vNbM/.d1ba', 0x000000000101000000f5cf1ebe9f2144403e1826e145e10ec0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id` int(10) UNSIGNED NOT NULL,
  `nick` varchar(50) NOT NULL,
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
(4, 'Fran', '::1', '2022-12-31', 1),
(5, 'Fran', '127.0.0.1', '2022-12-31', 1),
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
(18, 'Daniel', '127.0.0.1', '2023-01-03', 2);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `idMensaje` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `sexos`
--
ALTER TABLE `sexos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  ADD CONSTRAINT `FK_visitas_usuarios` FOREIGN KEY (`nick`) REFERENCES `usuarios` (`nick`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
