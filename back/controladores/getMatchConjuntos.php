<?php
    require_once '../basesDeDatos/bdCuore.php';
    $resultado = getMatchConjuntosBBDD();
    $json = json_encode($resultado);
    echo $json;