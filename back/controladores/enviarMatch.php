<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $datos = json_decode($datosJson);
    $match = actualizarMatchBBDD($datos);
    $json = json_encode($match);
    echo $json;