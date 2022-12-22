<?php
    require_once '../basesDeDatos/bdCuore.php';
    $perfil = getMiPerfilBBDD();
    $json = json_encode($perfil);
    echo $json;
