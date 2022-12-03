<?php
    function subirImagenAlServidor($imagen, $usuario){
        $extension = substr($imagen['name'], strrpos($imagen['name'], "."));
        $nombre_imagen = uniqid($usuario, true);
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/TFG/cuore/front/uploads/img/';
        move_uploaded_file($imagen['tmp_name'], $carpeta_destino.$nombre_imagen.$extension);
        return $carpeta_destino.$nombre_imagen.$extension; 
    } 

    function subirVideoAlServidor($video, $usuario){
        $extension = substr($video['name'], strrpos($video['name'], "."));
        $nombre_video = uniqid($usuario, true);
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/TFG/cuore/front/uploads/vid/';
        move_uploaded_file($video['tmp_name'], $carpeta_destino.$nombre_video.$extension); 
        return $carpeta_destino.$nombre_video.$extension;
    } 