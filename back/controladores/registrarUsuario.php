<?php
    //require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    require_once './validacionFormularios.php';
    $imagen = $_FILES['imagen'];
    $video = $_FILES['video'];
    $datos = json_decode($_REQUEST['bodyContent']);
    $codigo_error = validarFormularioRegistro($datos, $imagen, $video);
    if ($codigo_error == 0) {
        $ruta_imagen = subirImagenAlServidor($imagen, $datos->nick);
        $ruta_video = subirVideoAlServidor($video, $datos->nick);
        //registrarUsuarioBBDD
    }
    $json = json_encode($codigo_error);
    echo $json;