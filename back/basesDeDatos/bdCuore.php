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