<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $nick = json_decode($datosJson);
    $usuario = getUsuarioBBDD($nick);
    $json = json_encode($usuario);
    echo $json;