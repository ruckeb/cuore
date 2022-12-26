<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $perfil_actualizado = json_decode($datosJson);
    $perfil = actualizarPerfilBBDD($perfil_actualizado);
    $json = json_encode($perfil);
    echo $json;