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
                $sql = "SELECT publi.id, nick, texto, imagen, creado, 
                        distanciaCoordenadas(X(ubicacion), Y(ubicacion), X(ubicacion_yo), Y(ubicacion_yo)) as distancia,
                        ABS(DATEDIFF(fecha_nacimiento, fecha_yo)) as dif_edad,
                        labios, pulgares, fuegos, corazones, dislikes, c.id as id_comentario, 
                        c.fecha as fecha_comentario, c.comentario, c.nick_comenta
                        FROM (	
                            SELECT p.*, u.nick, u.ubicacion, u.fecha_nacimiento, 
                            (SELECT ubicacion FROM usuarios WHERE nick='$nick') as ubicacion_yo,
                            (SELECT fecha_nacimiento FROM usuarios WHERE nick='$nick') as fecha_yo,
                            COALESCE(SUM(r.labios), 0) as labios, COALESCE(SUM(r.pulgar), 0) as pulgares, 
                            COALESCE(SUM(r.fuego), 0) as fuegos, COALESCE(SUM(r.corazon), 0) as corazones, 
                            COALESCE(SUM(r.dislike), 0) as dislikes
                            FROM publicaciones p
                            LEFT JOIN usuarios u
                            ON u.nick = p.nick_publicacion
                            LEFT JOIN reacciones r
                            ON r.id_publicacion = p.id
                            WHERE (nick_publicacion, creado) IN (
                                SELECT nick_publicacion, MAX(creado)
                                FROM publicaciones
                                WHERE SUBSTRING_INDEX(SUBSTRING_INDEX(imagen, '/', -2), '/', 1) = 'img'
                                GROUP BY nick_publicacion
                            )
                            AND SUBSTRING_INDEX(SUBSTRING_INDEX(p.imagen, '/', -2), '/', 1) = 'img'
                            AND u.nick != '$nick'
                            GROUP BY p.id
                        ) publi
                        LEFT JOIN comentarios c
                        ON c.id_publicacion = publi.id
                        ORDER BY distancia, dif_edad, fecha_comentario DESC";
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
                            'labios' => $recomendacion['labios'],
                            'pulgares' => $recomendacion['pulgares'],
                            'fuegos' => $recomendacion['fuegos'],
                            'corazones' => $recomendacion['corazones'],
                            'dislikes' => $recomendacion['dislikes'],
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
                                    'fecha_comentario' => $recomendacion['fecha_comentario'],
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
                                    'fecha_comentario' => $recomendacion['fecha_comentario'],
                                    'nick_comentario' => $recomendacion['nick_comenta'],
                                    'comentario' => $recomendacion['comentario'],
                                );
                                array_push($resultado[$index]['comentarios'], $comentario);
                            }
                        }
                        
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