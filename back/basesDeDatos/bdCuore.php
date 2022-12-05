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

    function registrarUsuarioBBDD($nick, $fecha_nacimiento, $email, $sexo, $perfil_busqueda, $clave, $ruta_imagen, $ruta_video){
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
            	
            $sql = $db->prepare("INSERT INTO usuarios (nick, fecha_nacimiento, email, sexo, perfil_busqueda, imagen, video_present, clave)
                    VALUES (:nick, :fecha_nacimiento, :email, :sexo, :perfil_busqueda, :imagen, :video_present, :clave)");
            $sql->bindParam(':nick', $nick);
            $sql->bindParam(':fecha_nacimiento', $fecha_nacimiento);
            $sql->bindParam(':email', $email);
            $sql->bindParam(':sexo', $sexo);
            $sql->bindParam(':perfil_busqueda', $perfil_busqueda);
            $sql->bindParam(':imagen', $ruta_imagen);
            $sql->bindParam(':video_present', $ruta_video);
            $clave_cifrada = password_hash($clave, PASSWORD_BCRYPT);
            $sql->bindParam(':clave', $clave_cifrada);
            $sql->execute();
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