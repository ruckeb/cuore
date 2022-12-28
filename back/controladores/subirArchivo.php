<?php
    function subirImagenAlServidor($imagen){
        $extension = substr($imagen['name'], strrpos($imagen['name'], "."));
        $nombre_imagen = uniqid('cuore', true);
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/back/uploads/img/';
        move_uploaded_file($imagen['tmp_name'], $carpeta_destino.$nombre_imagen.$extension);
        return '/back/uploads/img/'.$nombre_imagen.$extension; 
    } 

    function subirVideoAlServidor($video){
        $extension = substr($video['name'], strrpos($video['name'], "."));
        $nombre_video = uniqid('cuore', true);
        $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/back/uploads/vid/';
        move_uploaded_file($video['tmp_name'], $carpeta_destino.$nombre_video.$extension); 
        return '/back/uploads/vid/'.$nombre_video.$extension;
    } 

    function subirArchivoAlServidor($archivo){
        $extension = substr($archivo['name'], strrpos($archivo['name'], "."));
        if (strtolower($extension) == ".png" 
            || strtolower($extension) == ".jpg" 
            || strtolower($extension) == ".jpeg") {
            return subirImagenAlServidor($archivo);
        } else {
            if (strtolower($extension) == ".mp4" 
            || strtolower($extension) == ".ogv" 
            || strtolower($extension) == ".webm") {
                return subirVideoAlServidor($archivo);
            }
            else {
                return 509; //formato no permitido
            }
        }
    }

    function borrarFicheroServidor($ruta){
        if (file_exists($_SERVER['DOCUMENT_ROOT'].$ruta)) {
            unlink($_SERVER['DOCUMENT_ROOT'].$ruta);        
        }
    }

    function copiarImagen($origen){
        $extension = substr($origen, strrpos($origen, "."));
        $destino = '/back/uploads/img/'.uniqid('cuore', true).$extension;
        copy($_SERVER['DOCUMENT_ROOT'].$origen, $_SERVER['DOCUMENT_ROOT'].$destino);
        return $destino; 
    } 

    function copiarVideo($origen){
        $extension = substr($origen, strrpos($origen, "."));
        $destino = '/back/uploads/vid/'.uniqid('cuore', true).$extension;
        copy($_SERVER['DOCUMENT_ROOT'].$origen, $_SERVER['DOCUMENT_ROOT'].$destino);
        return $destino; 
    } 