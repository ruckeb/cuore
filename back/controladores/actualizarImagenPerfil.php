<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    $imagen = $_FILES['imagen'];
    session_start();
    $ruta_imagen = subirImagenAlServidor($imagen, $_SESSION['usuario']);
    $actualizado = actualizarImagenPerfilBBDD($ruta_imagen);
    if (is_string($actualizado)) {
        borrarFicheroServidor($actualizado);
        $actualizado = true;
    }
    $json = json_encode($actualizado);
    echo $json;