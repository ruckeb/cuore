<?php
    require_once '../basesDeDatos/bdCuore.php';
    $usuarios = getUsuariosPremiumBBDD();
    $json = json_encode($usuarios);
    echo $json;