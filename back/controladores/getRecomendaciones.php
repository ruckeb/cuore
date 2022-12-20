<?php
    require_once '../basesDeDatos/bdCuore.php';
    //TODO activoBoton
    $recomendaciones = getRecomendacionesBBDD();
    $json = json_encode($recomendaciones);
    echo $json;
