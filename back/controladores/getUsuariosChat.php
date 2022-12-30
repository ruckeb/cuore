<?php
    require_once '../basesDeDatos/bdCuore.php';
    $usuarios = getUsuariosChatBBDD();
    $json = json_encode($usuarios);
    echo $json;