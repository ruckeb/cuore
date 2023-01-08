<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $datos = json_decode($datosJson);
    $borrado = eliminarMatchBBDD($datos);
    $json = json_encode($borrado);
    echo $json;