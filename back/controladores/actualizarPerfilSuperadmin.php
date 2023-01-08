<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    $datosJson = file_get_contents("php://input");
    $perfil_actualizado = json_decode($datosJson);
    $codigo_error = validarActualizarPerfilSuperadmin($perfil_actualizado);
    if ($codigo_error == 0) {
        $codigo_error = actualizarPerfilSuperadminBBDD($perfil_actualizado);
    }
    $json = json_encode($codigo_error);
    echo $json;