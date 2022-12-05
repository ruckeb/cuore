<?php
    function validarFormularioRegistro($datos, $imagen, $video) {
        if (!preg_match("/^[a-z0-9_-]{2,50}/", $datos->nick)) {
            return 1; //El campo nick debe contener entre 2 y 50 caracteres: letras minúsculas, números, - y _
        }
        $fecha  = explode('-', $datos->fecha_nacimiento);
        if (!checkdate($fecha[1], $fecha[2], $fecha[0])) {
            return 2; //Debe ser una fecha válida
        }
        if (!preg_match("/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/", $datos->email) ||
            strlen($datos->email) > 150 || strlen($datos->email) < 5) {
            return 3; //El email debe tener el formato xxx@xxx.xxx
        }
        if (!preg_match("/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$/", $datos->clave) ||
            strlen($datos->clave) > 20 || strlen($datos->clave) < 8) {
            return 4; //La clave debe contener al menos una mayúscula, una minúscula y un número, además no puede contener espacios
        }
        if (!($imagen['type']=="image/jpeg" || 
            $imagen['type']=="image/jpg" || 
            $imagen['type']=="image/png")) {
            return 5; //Sólo se permiten imagenes con la extensión .jpg .jpeg o .png
        }
        if ($imagen['size'] > 3000000) {
            return 6; //El tamaño máximo de la imagen son 3000000 bytes
        }
        if (!($video['type']=="video/webm" || 
            $video['type']=="video/ogg" || 
            $video['type']=="video/mp4")) {
            return 7; //Sólo se permiten videos con la extensión .webm .ogv o .mp4
        }
        if ($imagen['size'] > 5000000) {
            return 8; //El tamaño máximo del video son 5000000 bytes
        }
        if (!mayorDeEdad($datos->fecha_nacimiento)) {
            return 9; //El usuario debe ser mayor de edad
        }
        return 0;
        /*nombre [a-zA-ZñÑáéíóúÁÉÍÓÚàèìòùâêîôûäëïöüçÇ]{2,50}*/
    }

    function mayorDeEdad($fecha_nacimiento) {
        $nace = date_create($fecha_nacimiento);
        $actual = date_create();
        $calculo = date_diff($actual, $nace);
        if ($calculo->y < 18) {
            return false;
        }
        return true;
    }

    function validarFormularioInicioSesion($datos){
        if (!preg_match("/^[a-z0-9_-]{2,50}/", $datos->usuario)) {
            return 1; //El campo nick debe contener entre 2 y 50 caracteres: letras minúsculas, números, - y _
        }
        if (!preg_match("/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$/", $datos->contrasena) ||
            strlen($datos->contrasena) > 20 || strlen($datos->contrasena) < 8) {
            return 4; //La clave debe contener al menos una mayúscula, una minúscula y un número, además no puede contener espacios
        }
        return 0;
    }