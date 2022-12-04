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