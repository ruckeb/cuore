<?php
    function subirImagenAlServidor($imagen, $usuario){
        $extension = substr($imagen['name'], strrpos($imagen['name'], "."));
        $nombre_imagen = uniqid($usuario, true);
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/back/uploads/img/';
        move_uploaded_file($imagen['tmp_name'], $carpeta_destino.$nombre_imagen.$extension);
        return '/back/uploads/img/'.$nombre_imagen.$extension; 
    } 

    function subirVideoAlServidor($video, $usuario){
        $extension = substr($video['name'], strrpos($video['name'], "."));
        $nombre_video = uniqid($usuario, true);
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/back/uploads/vid/';
        move_uploaded_file($video['tmp_name'], $carpeta_destino.$nombre_video.$extension); 
        return '/back/uploads/vid/'.$nombre_video.$extension;
    } 

    function subirArchivoAlServidor($archivo, $usuario){
        $extension = substr($archivo['name'], strrpos($archivo['name'], "."));
        if (strtolower($extension) == ".png" 
            || strtolower($extension) == ".jpg" 
            || strtolower($extension) == ".jpeg") {
            subirImagenAlServidor($archivo, $usuario);
        } else {
            if (strtolower($extension) == ".mp4" 
            || strtolower($extension) == ".ogv" 
            || strtolower($extension) == ".webm") {
                subirVideoAlServidor($archivo, $usuario);
            }
            else {
                return 509; //formato no permitido
            }
        }
    } 

    function borrarFicheroServidor($ruta){
        unlink($_SERVER['DOCUMENT_ROOT'].$ruta);
    }