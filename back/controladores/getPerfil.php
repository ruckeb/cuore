<?php
    require_once '../basesDeDatos/bdCuore.php';
    $nick = null;
    if (isset($_GET['usuario'])) {
        $nick = $_GET['usuario'];
    }
    $perfil = getPerfilBBDD($nick);
    $json = json_encode($perfil);
    echo $json;