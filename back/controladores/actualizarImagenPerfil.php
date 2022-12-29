<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    require_once './subirArchivo.php';
    $imagen = $_FILES['imagen'];
    $codigo_error = validarImagenPerfil($imagen);
    if ($codigo_error == 0) {
        $ruta_imagen = subirImagenAlServidor($imagen);
        $codigo_error = actualizarImagenPerfilBBDD($ruta_imagen);
        if (is_string($codigo_error)) {
            borrarFicheroServidor($codigo_error);
            $codigo_error = $ruta_imagen;
        }
    }
    $json = json_encode($codigo_error);
    echo $json;

/* 
    CODIGOS DE ERROR 
    509
    514
    999

*/