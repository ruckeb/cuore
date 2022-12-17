<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $datos = json_decode($datosJson);
    $recomendaciones = getRecomendacionesBBDD($datos);
    $json = json_encode($recomendaciones);
    echo $json;
