<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $reaccion = json_decode($datosJson);
    $perfil = actualizarReaccionBBDD($reaccion);
    $json = json_encode($perfil);
    echo $json;

/* 
    CODIGOS DE ERROR 
    511
    999

*/