<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    $datosJson = file_get_contents("php://input");
    $publicacion = json_decode($datosJson);
    $borrado = borrarPublicacionBBDD($publicacion);
    if (is_string($borrado)) {
        borrarFicheroServidor($borrado);
        $borrado = true;
    }
    $json = json_encode($borrado);
    echo $json;

/* 
    CODIGOS DE ERROR 
    518
    999

*/