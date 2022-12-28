<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    require_once './validacionFormularios.php';
    $imagen = $_FILES['imagen'];
    $video = $_FILES['video'];
    $datos = json_decode($_REQUEST['bodyContent']);
    $codigo_error = validarFormularioRegistro($datos, $imagen, $video);
    if ($codigo_error == 0) {
        $ruta_imagen_usuario = subirImagenAlServidor($imagen);
        $ruta_imagen_publicacion = copiarImagen($ruta_imagen_usuario);  
        $ruta_video_usuario = subirVideoAlServidor($video);
        $ruta_video_publicacion = copiarVideo($ruta_video_usuario);
        $codigo_error = registrarUsuarioBBDD($datos->nick, $datos->fecha_nacimiento, $datos->email, $datos->sexo, $datos->perfil_busqueda, $datos->clave, $ruta_imagen_usuario, $ruta_video_usuario, $ruta_imagen_publicacion, $ruta_video_publicacion, $datos->latitud, $datos->longitud);
        if ($codigo_error != 0) {
            borrarFicheroServidor($ruta_imagen_usuario);
            borrarFicheroServidor($ruta_imagen_publicacion);
            borrarFicheroServidor($ruta_video_usuario);
            borrarFicheroServidor($ruta_video_publicacion);
        }
        $codigo_error = $codigo_error;
    }
    $json = json_encode($codigo_error);
    echo $json;