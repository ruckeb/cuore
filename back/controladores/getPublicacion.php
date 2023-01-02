<?php
    require_once '../basesDeDatos/bdCuore.php';
    $publicacion = getPublicacionBBDD($_GET['id']);
    $json = json_encode($publicacion);
    echo $json;