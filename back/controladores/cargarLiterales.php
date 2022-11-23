<?php
    require_once '../basesDeDatos/bdLiterales.php';
    $datosJson = file_get_contents("php://input");
    $datos = json_decode($datosJson);
    $array = cargarLiterales($datos->id_html);
    $json = json_encode($array);
    echo $json;