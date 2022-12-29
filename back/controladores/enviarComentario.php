<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    $datosJson = file_get_contents("php://input");
    $comentario = json_decode($datosJson);
    $codigo_error = validarEnviarComentario($comentario);
    if ($codigo_error == 0) {
        $codigo_error = enviarComentarioBBDD($comentario);
    }
    $json = json_encode($codigo_error);
    echo $json;

/* 
    CODIGOS DE ERROR 
    10
    519
    999

*/