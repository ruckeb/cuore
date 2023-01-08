<?php
    require_once '../basesDeDatos/bdCuore.php';
    $usuario = getUsuariosBBDD();
    $json = json_encode($usuario);
    echo $json;