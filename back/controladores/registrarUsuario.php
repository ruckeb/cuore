<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    require_once './validacionFormularios.php';
    $imagen = $_FILES['imagen'];
    $video = $_FILES['video'];
    $datos = json_decode($_REQUEST['bodyContent']);
    $codigo_error = validarFormularioRegistro($datos, $imagen, $video);
    if ($codigo_error == 0) {
        $ruta_imagen = subirImagenAlServidor($imagen, $datos->nick);
        $ruta_video = subirVideoAlServidor($video, $datos->nick);
        $codigo_error = registrarUsuarioBBDD($datos->nick, $datos->fecha_nacimiento, $datos->email, $datos->sexo, $datos->perfil_busqueda, $datos->clave, $ruta_imagen, $ruta_video);
        if ($codigo_error != 0) {
            unlink($ruta_imagen);
            unlink($ruta_video);
        }
        $codigo_error = $codigo_error;
    }
    $json = json_encode($codigo_error);
    echo $json;