<?php
    require_once '../basesDeDatos/bdCuore.php';
    $datosJson = file_get_contents("php://input");
    $comentario = json_decode($datosJson);
    $borrado = borrarComentarioBBDD($comentario);
    $json = json_encode($borrado);
    echo $json;

/* 
    CODIGOS DE ERROR 
    517
    999

*/