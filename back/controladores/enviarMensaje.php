<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    $datosJson = file_get_contents("php://input");
    $comentario = json_decode($datosJson);
    $codigo_error = validarEnviarMensaje($comentario);
    if ($codigo_error == 0) {
        $codigo_error = enviarMensajeBBDD($comentario);
    }
    $json = json_encode($codigo_error);
    echo $json;