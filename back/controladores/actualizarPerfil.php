<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    $datosJson = file_get_contents("php://input");
    $perfil_actualizado = json_decode($datosJson);
    $codigo_error = validarActualizarPerfil($perfil_actualizado);
    if ($codigo_error == 0) {
        $codigo_error = actualizarPerfilBBDD($perfil_actualizado);
    }
    $json = json_encode($codigo_error);
    echo $json;

/* 
    CODIGOS DE ERROR 
    3
    11
    12
    13
    512
    513
    999

*/