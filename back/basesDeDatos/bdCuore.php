<?php
    function getConnection(){
        try {
            $dbname = "Cuore";
            $host= "localhost";
            $user_bd = "root";
            $password_db = "";
            return new PDO("mysql:dbname=$dbname;host=$host", $user_bd, $password_db);
        } catch (Exception $e) {
            throw new Exception("Error al conectar a la base de datos cuore");
        }
    }

    function validateToken(){
        session_start();
        if (!isset($_SESSION['token']) || !isset($_COOKIE['token']) || $_SESSION['token'] != $_COOKIE['token']) {
            return false;
        } else {
            setcookie("token", $_SESSION['token'], time() + 60 * 5, "/"); //añado 5 minutos al token por hacer una operacion
            return true;
        }
    }

    function registrarUsuarioBBDD($nick, $fecha_nacimiento, $email, $sexo, $perfil_busqueda, $clave, $ruta_imagen, $ruta_video, $latitud, $longitud){
        try {
            $db = getConnection();
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //Comprobar si existe el nick
            $sql =  "SELECT count(*)
                    FROM usuarios
                    WHERE nick='$nick'";
            if ($db->query($sql)->fetchColumn() != 0) {
                return 501; //El usuario ya existe
            }

            //Comprobar  si existe el correo
            $sql =  "SELECT count(*)
                    FROM usuarios
                    WHERE email='$email'";
            if ($db->query($sql)->fetchColumn() != 0) {
                return 502; //El correo ya existe
            }

            $db->beginTransaction();  
            	
            $sql = $db->prepare("INSERT INTO usuarios (nick, fecha_nacimiento, email, sexo, perfil_busqueda, imagen, video_present, clave, ubicacion)
                    VALUES (:nick, :fecha_nacimiento, :email, :sexo, :perfil_busqueda, :imagen, :video_present, :clave, PointFromText(:ubicacion))");
            $sql->bindParam(':nick', $nick);
            $sql->bindParam(':fecha_nacimiento', $fecha_nacimiento);
            $sql->bindParam(':email', $email);
            $sql->bindParam(':sexo', $sexo);
            $sql->bindParam(':perfil_busqueda', $perfil_busqueda);
            $sql->bindParam(':imagen', $ruta_imagen);
            $sql->bindParam(':video_present', $ruta_video);
            $clave_cifrada = password_hash($clave, PASSWORD_BCRYPT);
            $sql->bindParam(':clave', $clave_cifrada);
            $ubicacion = "POINT($latitud $longitud)";
            $sql->bindParam(':ubicacion', $ubicacion);
            $sql->execute();

            $sql = "INSERT INTO publicaciones (nick_publicacion, imagen)
                    VALUES ('$nick', '$ruta_imagen')";
            if ($db->query($sql) === FALSE) {
                $db->rollback();  
                return 507; //Error insertando la imagen
            }

            $sql = "INSERT INTO publicaciones (nick_publicacion, imagen)
                    VALUES ('$nick', '$ruta_video')";
            if ($db->query($sql) === FALSE) {
                $db->rollback();  
                return 508; //Error insertando el video
            }

            $db->commit();  
            return 0;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    function iniciarSesionBBDD($usuario, $contrasena){
        try {
            $db = getConnection();
            $sql = "SELECT u.nick, u.nombre, u.fecha_nacimiento, u.email, s.sexo, b.busqueda, u.imagen, u.video_present, u.clave
                    FROM usuarios u
                    JOIN sexos s 
                    ON u.sexo = s.id
                    JOIN busquedas b
                    ON u.perfil_busqueda = b.id
                    WHERE u.nick = '$usuario'";
            $usuarios = $db->query($sql);	
            if($usuarios->rowCount() === 1){		
                foreach ($usuarios as $usuario) {
                    if (password_verify($contrasena, $usuario['clave'])) {
                        return $usuario;
                    } else {
                        return 504; //La contraseña es incorrecta
                    }
                }	
            } else{
                return 503; //El usuario no existe
            }
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    function contarVisita($nick) {
        try {
            $db = getConnection();
            $ip = $_SERVER['REMOTE_ADDR'];
            $fecha_actual = date_create();
            $fecha = date_format($fecha_actual,"Y-m-d");
            $sql = "SELECT *
                    FROM visitas
                    WHERE nick = '$nick'
                    AND ip = '$ip'
                    AND fecha = '$fecha'";
            $visitas = $db->query($sql);	
            if($visitas->rowCount() === 1){	
                foreach ($visitas as $visita) {
                    $contador = $visita['contador'] + 1;
                    $id = $visita['id'];
                    $sql = "UPDATE visitas 
                            SET contador=$contador
                            WHERE id=$id";
                    if ($db->query($sql) === FALSE) {
                        return 505; //Error actualizando las visitas
                    }
                }
            } else{ 
                $sql = "INSERT INTO visitas (nick, ip, fecha, contador)
                        VALUES ('$nick', '$ip', '$fecha', 1)";
                if ($db->query($sql) === FALSE) {
                    return 506; //Error insertando las visitas
                }
            }
            return 0;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    function getRecomendacionesBBDD(){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT recomen.id, nick, texto, imagen, creado, distancia, dif_edad, total_labios, total_pulgares, total_fuegos, total_corazones, total_dislikes,
                        labios_yo, pulgar_yo, fuego_yo, corazon_yo, dislike_yo, c.id AS id_comentario, nick_comenta, fecha, comentario
                        FROM
                        (
                            SELECT id, nick, texto, imagen, creado, distancia, dif_edad, messirve, sexo, logged_nick, perfil_busqueda,
                            (SELECT COALESCE(SUM(labios), 0) FROM reacciones WHERE nick_reaccion=logged_nick AND id=id_publicacion) as labios_yo,
                            (SELECT COALESCE(SUM(pulgar), 0) FROM reacciones WHERE nick_reaccion=logged_nick AND id=id_publicacion) as pulgar_yo,
                            (SELECT COALESCE(SUM(fuego), 0) FROM reacciones WHERE nick_reaccion=logged_nick AND id=id_publicacion) as fuego_yo,
                            (SELECT COALESCE(SUM(corazon), 0) FROM reacciones WHERE nick_reaccion=logged_nick AND id=id_publicacion) as corazon_yo,
                            (SELECT COALESCE(SUM(dislike), 0) FROM reacciones WHERE nick_reaccion=logged_nick AND id=id_publicacion) as dislike_yo,
                            COALESCE(SUM(r.labios), 0) as total_labios, COALESCE(SUM(r.pulgar), 0) as total_pulgares, 
                            COALESCE(SUM(r.fuego), 0) as total_fuegos, COALESCE(SUM(r.corazon), 0) as total_corazones, 
                            COALESCE(SUM(r.dislike), 0) as total_dislikes
                            FROM
                            (
                                SELECT u.nick, u.sexo, logged.nick as logged_nick, logged.perfil_busqueda,
                                CASE 
                                    WHEN logged.perfil_busqueda <5 AND logged.perfil_busqueda = u.sexo THEN 1
                                    WHEN logged.perfil_busqueda = 5 AND (u.sexo = 1 OR u.sexo = 2) THEN 1
                                    WHEN logged.perfil_busqueda = 6 AND (u.sexo = 1 OR u.sexo = 3) THEN 1
                                    WHEN logged.perfil_busqueda = 7 AND (u.sexo = 1 OR u.sexo = 4) THEN 1
                                    WHEN logged.perfil_busqueda = 8 AND (u.sexo = 2 OR u.sexo = 3) THEN 1
                                    WHEN logged.perfil_busqueda = 9 AND (u.sexo = 2 OR u.sexo = 4) THEN 1
                                    WHEN logged.perfil_busqueda = 10 AND (u.sexo = 3 OR u.sexo = 4) THEN 1
                                    WHEN logged.perfil_busqueda = 11 THEN 1
                                    ELSE 0
                                END as messirve,
                                distanciaCoordenadas(X(u.ubicacion), Y(u.ubicacion), X(logged.ubicacion), Y(logged.ubicacion)) as distancia,
                                ABS(DATEDIFF(u.fecha_nacimiento, logged.fecha_nacimiento)) as dif_edad
                                FROM usuarios u
                                JOIN usuarios logged
                                WHERE logged.nick = '$nick'
                                AND u.nick != logged.nick
                            ) usuarios_r
                            JOIN 
                            (
                                SELECT *
                                FROM publicaciones p
                                WHERE 
                                (p.nick_publicacion, p.creado) IN (
                                    SELECT nick_publicacion, MAX(creado)
                                    FROM publicaciones
                                    WHERE SUBSTRING_INDEX(SUBSTRING_INDEX(imagen, '/', -2), '/', 1) = 'img'
                                    GROUP BY nick_publicacion)
                                AND SUBSTRING_INDEX(SUBSTRING_INDEX(imagen, '/', -2), '/', 1) = 'img'
                            ) ultima_publicacion
                            ON usuarios_r.nick = ultima_publicacion.nick_publicacion
                            LEFT JOIN reacciones r 
                            ON r.id_publicacion=ultima_publicacion.id
                            WHERE messirve=1
                            GROUP BY id
                        ) recomen
                        LEFT JOIN comentarios c
                        ON c.id_publicacion= recomen.id
                        ORDER BY distancia, dif_edad, fecha DESC";
                $recomendaciones = $db->query($sql);	
                if($recomendaciones === FALSE){		
                    return 507; //No existen recomendaciones disponibles
                } else{
                    $resultado = array();
                    foreach ($recomendaciones as $recomendacion) {
                        $recomen = array(
                            'id' => $recomendacion['id'],
                            'nick' => $recomendacion['nick'],
                            'texto' => $recomendacion['texto'],
                            'imagen' => $recomendacion['imagen'],
                            'creado' => $recomendacion['creado'],
                            'distancia' => $recomendacion['distancia'],
                            'dif_edad' => $recomendacion['dif_edad'],
                            'labios' => $recomendacion['total_labios'],
                            'pulgares' => $recomendacion['total_pulgares'],
                            'fuegos' => $recomendacion['total_fuegos'],
                            'corazones' => $recomendacion['total_corazones'],
                            'dislikes' => $recomendacion['total_dislikes'],
                            'labios_yo' => $recomendacion['labios_yo'],
                            'pulgar_yo' => $recomendacion['pulgar_yo'],
                            'fuego_yo' => $recomendacion['fuego_yo'],
                            'corazon_yo' => $recomendacion['corazon_yo'],
                            'dislike_yo' => $recomendacion['dislike_yo'],
                            'comentarios' => array(),
                        );
                        $index = null;
                        foreach ($resultado as $key => $value) {
                            if ($value['id'] == $recomendacion['id']) {
                                $index = $key;
                                break;
                            }
                        }
                        if (!isset($index)) {
                            if (isset($recomendacion['id_comentario'])) {
                                $comentario = array(
                                    'id_comentario' => $recomendacion['id_comentario'],
                                    'fecha_comentario' => $recomendacion['fecha'],
                                    'nick_comentario' => $recomendacion['nick_comenta'],
                                    'comentario' => $recomendacion['comentario'],
                                );
                                array_push($recomen['comentarios'], $comentario);
                            }
                            array_push($resultado, $recomen);
                        } else {
                            if (isset($recomendacion['id_comentario'])) {
                                $comentario = array(
                                    'id_comentario' => $recomendacion['id_comentario'],
                                    'fecha_comentario' => $recomendacion['fecha'],
                                    'nick_comentario' => $recomendacion['nick_comenta'],
                                    'comentario' => $recomendacion['comentario'],
                                );
                                array_push($resultado[$index]['comentarios'], $comentario);
                            }
                        }
                    }
                    if (empty($resultado)) {
                        return 510; //no existen recomendaciones
                    }
                    return $resultado;
                }
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        } 
    }

    function getPerfilBBDD($nick){
        if (validateToken()) {
            try {
                $db = getConnection();
                if(is_null($nick)){
                    $nick = $_SESSION['usuario'];
                }
                $sql = "SELECT u.nick, u.nombre, u.email, u.sexo, u.perfil_busqueda, u.imagen, p.id, p.texto, p.imagen as publi, p.creado
                        FROM usuarios u 
                        JOIN publicaciones p
                        ON u.nick = p.nick_publicacion
                        WHERE u.nick='$nick'
                        ORDER BY p.creado DESC";
                $filas = $db->query($sql);	
                $contador = 0;
                foreach ($filas as $fila) {
                    if ($contador == 0) {
                        $contador = $contador + 1;
                        $usuario = array(
                            'nick' => $fila['nick'],
                            'nombre' => !is_null($fila['nombre']) ? $fila['nombre'] : '',
                            'email' => $fila['email'],
                            'sexo' => $fila['sexo'],
                            'perfil_busqueda' => $fila['perfil_busqueda'],
                            'imagen' => $fila['imagen'],
                            'imagenes_publicadas' => array(),
                            'videos_publicados' => array(),
                        );
                    }
                    if (explode("/", $fila['publi'])[3] == "img") {
                        $imagen = array(
                            'id' => $fila['id'],
                            'texto' => $fila['texto'],
                            'publi' => $fila['publi'],
                            'creado' => $fila['creado'],
                        );
                        array_push($usuario['imagenes_publicadas'], $imagen);
                    } else {
                        $video = array(
                            'id' => $fila['id'],
                            'texto' => $fila['texto'],
                            'publi' => $fila['publi'],
                            'creado' => $fila['creado'],
                        );
                        array_push($usuario['videos_publicados'], $video);
                    }
                }
                return $usuario;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        } 
    }

    function actualizarReaccionBBDD($datos){
        if (validateToken()) {
            try {
                $db = getConnection();
                $id_publicacion = $datos->id;
                $nick = $_SESSION['usuario'];
                $sql = "SELECT *
                        FROM reacciones
                        WHERE id_publicacion=$id_publicacion
                        AND nick_reaccion='$nick'";
                $reacciones = $db->query($sql);	
                switch ($datos->reaccion) {
                    case "fuego":
                        if($reacciones->rowCount() === 1){	
                            $fuego_anterior = 0;	
                            foreach ($reacciones as $reaccion) {
                                $fuego_anterior = $reaccion['fuego'];
                            }	
                            $fuego_actual = $fuego_anterior==0?1:0;
                            $sql = "UPDATE reacciones
                                    SET fuego = $fuego_actual
                                    WHERE id_publicacion = '$id_publicacion'
                                    AND nick_reaccion = '$nick'";
                        } else {
                            $sql = "INSERT INTO reacciones (id_publicacion, nick_reaccion, fuego)
                                    VALUES ('$id_publicacion','$nick', 1)";
                        }
                        break;
                    case "corazon":
                        if($reacciones->rowCount() === 1){	
                            $corazon_anterior = 0;	
                            foreach ($reacciones as $reaccion) {
                                $corazon_anterior = $reaccion['corazon'];
                            }	
                            $corazon_actual = $corazon_anterior==0?1:0;
                            $sql = "UPDATE reacciones
                                    SET corazon = $corazon_actual
                                    WHERE id_publicacion = '$id_publicacion'
                                    AND nick_reaccion = '$nick'";
                        } else {
                            $sql = "INSERT INTO reacciones (id_publicacion, nick_reaccion, corazon)
                                    VALUES ('$id_publicacion','$nick', 1)";
                        }
                        break;
                    case "pulgar":
                        if($reacciones->rowCount() === 1){	
                            $pulgar_anterior = 0;	
                            foreach ($reacciones as $reaccion) {
                                $pulgar_anterior = $reaccion['pulgar'];
                            }	
                            $pulgar_actual = $pulgar_anterior==0?1:0;
                            $sql = "UPDATE reacciones
                                    SET pulgar = $pulgar_actual
                                    WHERE id_publicacion = '$id_publicacion'
                                    AND nick_reaccion = '$nick'";
                        } else {
                            $sql = "INSERT INTO reacciones (id_publicacion, nick_reaccion, pulgar)
                                    VALUES ('$id_publicacion','$nick', 1)";
                        }
                        break;
                    case "dislike":
                        if($reacciones->rowCount() === 1){	
                            $dislike_anterior = 0;	
                            foreach ($reacciones as $reaccion) {
                                $dislike_anterior = $reaccion['dislike'];
                            }	
                            $dislike_actual = $dislike_anterior==0?1:0;
                            $sql = "UPDATE reacciones
                                    SET dislike = $dislike_actual
                                    WHERE id_publicacion = '$id_publicacion'
                                    AND nick_reaccion = '$nick'";
                        } else {
                            $sql = "INSERT INTO reacciones (id_publicacion, nick_reaccion, dislike)
                                    VALUES ('$id_publicacion','$nick', 1)";
                        }
                        break;
                    case "labios":
                        if($reacciones->rowCount() === 1){	
                            $labios_anterior = 0;	
                            foreach ($reacciones as $reaccion) {
                                $labios_anterior = $reaccion['labios'];
                            }	
                            $labios_actual = $labios_anterior==0?1:0;
                            $sql = "UPDATE reacciones
                                    SET labios = $labios_actual
                                    WHERE id_publicacion = '$id_publicacion'
                                    AND nick_reaccion = '$nick'";
                        } else {
                            $sql = "INSERT INTO reacciones (id_publicacion, nick_reaccion, labios)
                                    VALUES ('$id_publicacion','$nick', 1)";
                        }
                        break;
                    default:
                        return 511; //Error actualizando la reaccion
                }

                if ($db->query($sql) === FALSE) {
                    return 511; //Error actualizando la reaccion
                }
                return true;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }