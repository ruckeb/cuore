<?php
    require_once '../basesDeDatos/bdCuore.php';
    $codigo_error = enviarPagoBBDD();
    $json = json_encode($codigo_error);
    echo $json;