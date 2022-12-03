<?php
    function validarFormularioRegistro($datos, $imagen, $video) {
        if (!preg_match("/[\-\_\da-z]{2,50}/", $datos->nick)) {
            return 1; //El campo nick debe contener entre 2 y 50 caracteres: letras minúsculas, números, - y _
        }
        $fecha  = explode('-', $datos->fecha_nacimiento);
        if (!checkdate($fecha[1], $fecha[2], $fecha[0])) {
            return 2; //Debe ser una fecha válida
        }
        if (!preg_match("/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/", $datos->email)) {
            return 3; //El email debe tener el formato xxx@xxx.xxx
        }
        if (!preg_match("/^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$/", $datos->clave)) {
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
        return 0;
        /*nombre [a-zA-ZñÑáéíóúÁÉÍÓÚàèìòùâêîôûäëïöüçÇ]{2,50}*/
    }