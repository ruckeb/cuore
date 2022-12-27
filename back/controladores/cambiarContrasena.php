<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    $datosJson = file_get_contents("php://input");
    $contrasena = json_decode($datosJson);
    $codigo_error = validarNuevaContrasena($contrasena);
    if ($codigo_error == 0) {
        $codigo_error = cambiarContrasenaBBDD($contrasena);
    }
    $json = json_encode($codigo_error);
    echo $json;