<?php
    require_once '../basesDeDatos/bdCuore.php';
    $resultado = getMatchEnviadosBBDD();
    $json = json_encode($resultado);
    echo $json;