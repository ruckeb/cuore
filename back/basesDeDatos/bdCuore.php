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

    function registrarUsuarioBBDD($nick, $fecha_nacimiento, $email, $sexo, $perfil_busqueda, $clave, $ruta_imagen_usuario, $ruta_video_usuario, $ruta_imagen_publicacion, $ruta_video_publicacion, $latitud, $longitud){
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
            $sql->bindParam(':imagen', $ruta_imagen_usuario);
            $sql->bindParam(':video_present', $ruta_video_usuario);
            $clave_cifrada = password_hash($clave, PASSWORD_BCRYPT);
            $sql->bindParam(':clave', $clave_cifrada);
            $ubicacion = "POINT($latitud $longitud)";
            $sql->bindParam(':ubicacion', $ubicacion);
            $sql->execute();

            $sql = "INSERT INTO publicaciones (nick_publicacion, imagen)
                    VALUES ('$nick', '$ruta_imagen_publicacion')";
            if ($db->query($sql) === FALSE) {
                $db->rollback();  
                return 507; //Error insertando la imagen
            }

            $sql = "INSERT INTO publicaciones (nick_publicacion, imagen)
                    VALUES ('$nick', '$ruta_video_publicacion')";
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

    function getRecomendacionesBBDD($id){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                if (is_null($id)) {
                    $sql = "SELECT id FROM
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
                        WHERE messirve=1
                        GROUP BY id
                        ORDER BY distancia, dif_edad, creado DESC";
                } else {
                    $sql = "SELECT id 
                            FROM publicaciones
                            WHERE nick_publicacion IN (SELECT nick_publicacion FROM publicaciones WHERE id=$id)
                            AND SUBSTRING_INDEX(SUBSTRING_INDEX(imagen, '/', -2), '/', 1) = 'img'
                            ORDER BY creado DESC";
                }
                $recomendaciones = $db->query($sql);	
                if($recomendaciones === FALSE){		
                    return 510; //No existen recomendaciones disponibles
                } 
                $resultado = array();
                foreach ($recomendaciones as $recomendacion) {
                    array_push($resultado, $recomendacion);
                }
                return $resultado;
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

    function actualizarPerfilBBDD($datos){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $nombre = $datos->nombre;
                $email = $datos->email;
                $sexo = $datos->sexo;
                $perfil_busqueda = $datos->perfil_busqueda;
                $sql = "SELECT *
                        FROM usuarios
                        WHERE nick!='$nick'
                        AND email='$email'";
                $usuarios = $db->query($sql);	
                if($usuarios->rowCount() === 1){
                    return 513;//El email introducido pertenece a otro usuario
                }
                $sql = "UPDATE usuarios
                        SET nombre='$nombre', email='$email', sexo='$sexo', perfil_busqueda='$perfil_busqueda'
                        WHERE nick = '$nick'";
                if ($db->query($sql) === FALSE) {
                    return 512; //Error actualizando el perfil
                }
                return true;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function actualizarImagenPerfilBBDD($ruta_imagen){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT *
                        FROM usuarios
                        WHERE nick='$nick'";
                $usuarios = $db->query($sql);
                foreach ($usuarios as $usuario) {
                    $imagen_antigua = $usuario['imagen'];
                }
                $sql = "UPDATE usuarios
                        SET imagen='$ruta_imagen'
                        WHERE nick = '$nick'";
                if ($db->query($sql) === FALSE) {
                    return 514; //Error actualizando la imagen
                }  
                return $imagen_antigua;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function cambiarContrasenaBBDD($contrasena){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $actual_contrasena = $contrasena->clave_antigua;
                $nueva_contrasena = $contrasena->clave_nueva;
                $sql = "SELECT *
                        FROM usuarios
                        WHERE nick='$nick'";
                $usuarios = $db->query($sql);
                foreach ($usuarios as $usuario) {
                    if (password_verify($actual_contrasena, $usuario['clave'])) {
                        $contrasena_cifrada = password_hash($nueva_contrasena, PASSWORD_BCRYPT);
                        $sql = "UPDATE usuarios
                                SET clave='$contrasena_cifrada'
                                WHERE nick = '$nick'";
                        if ($db->query($sql) === FALSE) {
                            return 515; //Error actualizando la contraseña
                        }  
                    } else {
                        return 504; //La contraseña actual no es correcta
                    }
                }
                return true;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function subirPublicacionBBDD($ruta_archivo, $datos){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $texto = $datos->texto;
                $sql = "INSERT INTO publicaciones (nick_publicacion, texto, imagen)
                        VALUES ('$nick','$texto','$ruta_archivo')";
                if ($db->query($sql) === FALSE) {
                    return 516; //Error subiendo la publicación
                }  
                return true;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function borrarComentarioBBDD($comentario){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $id = $comentario->id;
                $sql = "DELETE FROM comentarios WHERE id=$id AND nick_comenta='$nick'";
                if ($db->query($sql) === FALSE) {
                    return 517; //Error borrando el comentario
                }  
                return true;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function borrarPublicacionBBDD($publicacion){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $id = $publicacion->id;
                $sql = "SELECT imagen 
                        FROM publicaciones 
                        WHERE id=$id";
                $ruta_archivo = "";
                $publicaciones = $db->query($sql);
                if($publicaciones->rowCount() === 1){		
                    foreach ($publicaciones as $publicacion) {
                        $ruta_archivo = $publicacion['imagen'];
                    }
                }
                $sql = "DELETE FROM publicaciones WHERE id=$id AND nick_publicacion='$nick'";
                if ($db->query($sql) === FALSE) {
                    return 518; //Error borrando publicacion
                }  
                return !empty($ruta_archivo)?$ruta_archivo:518;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function enviarComentarioBBDD($comentario){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $id_publicacion = $comentario->id_publicacion;
                $texto = $comentario->comentario?$comentario->comentario:"";
                $sql = "INSERT INTO comentarios (id_publicacion, nick_comenta, comentario)
                        VALUES ($id_publicacion, '$nick', '$texto')";
                if ($db->query($sql) === FALSE) {
                    return 519; //Error enviando el comentario
                }  
                $lastId = $db->lastInsertId();
                return array(
                    'id' => $lastId
                );
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function enviarMensajeBBDD($mensaje){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $usuario_destino = $mensaje->usuario_destino;
                $texto = $mensaje->texto;
                $sql = "INSERT INTO mensajes (nick_origen, nick_destino, texto)
                        VALUES ('$nick', '$usuario_destino', '$texto')";
                if ($db->query($sql) === FALSE) {
                    return 520; //Error insertando el mensaje
                }  
                $lastId = $db->lastInsertId();
                return array(
                    'id' => $lastId
                );
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function getUsuarioLogeadoBBDD(){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT nick, premium, superadmin FROM usuarios WHERE nick='$nick'";
                $usuarios = $db->query($sql);
                if($usuarios->rowCount() === 1){		
                    foreach ($usuarios as $usuario) {
                        return $usuario;
                    }
                }
                return 522; //error usuario logueado
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function getPublicacionBBDD($id){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT publi.*, c.id as id_comentario, c.nick_comenta, c.fecha, c.comentario
                        FROM
                        (SELECT id, nick_publicacion, texto, imagen, creado, 
                        COALESCE(SUM(labios), 0) as total_labios, 
                        COALESCE(SUM(pulgar), 0) as total_pulgares,
                        COALESCE(SUM(fuego), 0) as total_fuegos, 
                        COALESCE(SUM(corazon), 0) as total_corazones,
                        COALESCE(SUM(dislike), 0) as total_dislikes,
                        (SELECT COALESCE(SUM(labios), 0) FROM reacciones WHERE nick_reaccion='$nick' and id_publicacion=p.id) as labios_yo,
                        (SELECT COALESCE(SUM(pulgar), 0) FROM reacciones WHERE nick_reaccion='$nick' and id_publicacion=p.id) as pulgar_yo,
                        (SELECT COALESCE(SUM(fuego) , 0) FROM reacciones WHERE nick_reaccion='$nick' and id_publicacion=p.id) as fuego_yo,
                        (SELECT COALESCE(SUM(corazon) , 0) FROM reacciones WHERE nick_reaccion='$nick' and id_publicacion=p.id) as corazon_yo,
                        (SELECT COALESCE(SUM(dislike) , 0) FROM reacciones WHERE nick_reaccion='$nick' and id_publicacion=p.id) as dislike_yo
                        FROM publicaciones p
                        LEFT JOIN
                        reacciones r
                        ON r.id_publicacion = p.id
                        WHERE p.id=$id
                        GROUP BY p.id) publi
                        LEFT JOIN comentarios c
                        ON c.id_publicacion=publi.id
                        ORDER BY c.fecha DESC";
                $publicaciones = $db->query($sql);
                $resultado = array();
                $contador = 0;
                foreach ($publicaciones as $publicacion) {
                    if ($contador==0) {
                        $resultado = array(
                            'id' => $publicacion['id'],
                            'nick' => $publicacion['nick_publicacion'],
                            'texto' => $publicacion['texto'],
                            'imagen' => $publicacion['imagen'],
                            'fecha' => $publicacion['creado'],
                            'labios' => $publicacion['total_labios'],
                            'pulgares' => $publicacion['total_pulgares'],
                            'fuegos' => $publicacion['total_fuegos'],
                            'corazones' => $publicacion['total_corazones'],
                            'dislikes' => $publicacion['total_dislikes'],
                            'labios_yo' => $publicacion['labios_yo'],
                            'pulgar_yo' => $publicacion['pulgar_yo'],
                            'fuego_yo' => $publicacion['fuego_yo'],
                            'corazon_yo' => $publicacion['corazon_yo'],
                            'dislike_yo' => $publicacion['dislike_yo'],
                            'comentarios' => array()
                        );
                        $contador++;
                    }
                    if (!is_null($publicacion['id_comentario'])) {
                        $comentario = array(
                            'id_comentario' => $publicacion['id_comentario'],
                            'nick_comentario' => $publicacion['nick_comenta'],
                            'fecha_comentario' => $publicacion['fecha'],
                            'comentario' => $publicacion['comentario']
    
                        );
                        array_push($resultado['comentarios'], $comentario);
                    }
                }
                if (empty($resultado)) {
                    return 521; //No existe la publicacion indicada
                }
                return $resultado; 
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function getUsuariosChatBBDD(){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT nick, imagen 
                        FROM usuarios
                        WHERE nick IN(
                            SELECT nick
                            FROM usuarios u
                            WHERE u.nick!='$nick'
                                INTERSECT 
                            (
                                SELECT nick_origen
                                FROM mensajes
                                WHERE '$nick' IN (nick_origen, nick_destino)
                                    UNION
                                SELECT nick_destino
                                FROM mensajes
                                WHERE '$nick' IN (nick_origen, nick_destino)
                            )
                        )";
                $usuarios = $db->query($sql);
                $resultado = array();
                foreach ($usuarios as $usuario) {
                    array_push($resultado, $usuario);
                }
                return $resultado;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function getUsuariosPremiumBBDD(){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT nick, imagen 
                        FROM usuarios 
                        WHERE premium=1
                        AND nick!='$nick'";
                $usuarios = $db->query($sql);
                $resultado = array();
                foreach ($usuarios as $usuario) {
                    array_push($resultado, $usuario);
                }
                return $resultado;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function cargarMensajesBBDD($datos){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $nick_destino = $datos->nick_destino;
                $sql = "SELECT * 
                        FROM mensajes
                        WHERE nick_origen IN ('$nick', '$nick_destino')
                        AND nick_destino IN ('$nick', '$nick_destino')
                        ORDER BY creado";
                $mensajes = $db->query($sql);
                $resultado = array();
                foreach ($mensajes as $mensaje) {
                    array_push($resultado, $mensaje);
                }
                return $resultado;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function enviarPagoBBDD(){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "UPDATE usuarios SET premium=1 WHERE nick='$nick'";
                $usuarios = $db->query($sql);
                if ($db->query($sql) === FALSE) {
                    return 523; //Error actualizando premium
                }
                return true;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function getUsuariosBBDD(){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $sql = "SELECT nick FROM usuarios ORDER BY nick";
                $usuarios = $db->query($sql);
                $resultado = array();
                foreach ($usuarios as $usuario) {
                    array_push($resultado, $usuario);
                }
                return $resultado;
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }

    function getUsuarioBBDD($datos){
        if (validateToken()) {
            try {
                $db = getConnection();
                $nick = $_SESSION['usuario'];
                $nick_usuario = $datos->nick;
                $sql = "SELECT nick, email, premium FROM usuarios WHERE nick='$nick_usuario'";
                $usuarios = $db->query($sql);
                if($usuarios->rowCount() === 1){
                    foreach ($usuarios as $usuario) {
                        return $usuario;
                    }
                }
                return 524; //El usuario indicado no existe
            } catch (Exception $e) {
                return $e->getMessage();
            }
        } else {
            return 999; //Token de sesion ha expirado
        }
    }