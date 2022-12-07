<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    $datosJson = file_get_contents("php://input");
    $datos = json_decode($datosJson);
    $codigo_error = validarFormularioInicioSesion($datos);
    if ($codigo_error == 0) {
        $usuario = iniciarSesionBBDD($datos->usuario, $datos->contrasena);
        if (isset($usuario['nick'])) {
            $codigo_error = contarVisita($datos->usuario);
            if ($codigo_error == 0) {
                $codigo_error = $usuario;
            }
        } else {
            $codigo_error = $usuario;
        }
    }
    $json = json_encode($codigo_error);
    echo $json;
