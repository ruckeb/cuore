<?php
    require_once '../basesDeDatos/bdCuore.php';
    $usuario = getUsuarioLogeadoBBDD();
    $json = json_encode($usuario);
    echo $json;