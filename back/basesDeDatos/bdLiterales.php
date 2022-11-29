<?php
    function getConnection(){
        try {
            $dbname = "literales_cuore";
            $host= "localhost";
            $user_bd = "root";
            $password_db = "";
            return new PDO("mysql:dbname=$dbname;host=$host", $user_bd, $password_db);
        } catch (Exception $e) {
            throw new Exception("Error al conectar a la base de datos");
        }
    }

    function cargarLiterales($id_html){
        try {
            $db = getConnection();
            $idioma = $_COOKIE['idioma'];
            $sql = "SELECT *
                    FROM literales
                    WHERE id_html='$id_html'
                    AND idioma='$idioma'";
            $literales = $db->query($sql);	
            $resultado = iterator_to_array($literales);
            return $resultado;
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }