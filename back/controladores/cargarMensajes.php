<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $datos = json_decode($datosJson);
    $array = cargarMensajesBBDD($datos);
    $json = json_encode($array);
    echo $json;