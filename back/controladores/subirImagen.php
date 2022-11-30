<?php
    $nombre_imagen = $_FILES['imagen']['name'];
    $tipo_imagen = $_FILES['imagen']['type'];
    $tamano_imagen = $_FILES['imagen']['size'];
    $codigo_error = 0;

    if ($tamano_imagen <= 3000000) {
        if ($tipo_imagen=="image/jpeg" || $tipo_imagen=="image/jpg" 
            || $tipo_imagen=="image/png") {
            $carpeta_destino = $_SERVER['DOCUMENT_ROOT'] . '/TFG/cuore/front/img/imgUsuarios/';
            move_uploaded_file($_FILES['imagen']['tmp_name'], $carpeta_destino.$nombre_imagen);
        } else {
            $mensaje_error = 2;//"Sólo se pueden subir imagenes jpeg/jpg/png"
        }
    } else {
        $mensaje_error = 1;//"El tamaño del archivo es demasiado grande"
    }
    