<?php
    //require_once '../basesDeDatos/bdCuore.php';
    $imagen = $_FILES['imagen'];
    $video = $_FILES['video_present'];
    $datos = json_decode($_REQUEST['bodyContent']);
    $codigo_error = validarFormulario($datos, $imagen, $video);
    echo $codigo_error;
    function validarFormulario($datos) {
        if (empty($datos->bodyContent->nick)) {
            return 1; //El campo nick no puede estar vacío
        } 
        if (strlen($datos->nick) > 50 || strlen($datos->nick) < 5) {
            return 2; //El campo nick tiene un mínimo de 5 y un máximo de 50 caracteres
        } 
        if (!preg_match("/^[a-z0-9_-]{2,50}$/", $datos->nick)) {
            return 3; //El campo nick solo puede contener letras minúsculas, números, - y _
        }
    /*nombre VARCHAR(50), [a-zA-ZñÑáéíóúÁÉÍÓÚàèìòùâêîôûäëïöüçÇ]{2,50}
    fecha_nacimiento DATE NOT NULL, 
    email VARCHAR(50) UNIQUE NOT NULL,
    sexo INT NOT NULL,
    perfil_busqueda INT NOT NULL,
    imagen VARCHAR(50) NOT NULL,
    video_present VARCHAR(50) NOT NULL,
    clave VARCHAR(20) NOT NULL,
*/
        return 0;
    }
    