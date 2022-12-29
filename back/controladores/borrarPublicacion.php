<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $publicacion = json_decode($datosJson);
    $borrado = borrarPublicacionBBDD($publicacion);
    $json = json_encode($borrado);
    echo $json;

/* 
    CODIGOS DE ERROR 
    518
    999

*/