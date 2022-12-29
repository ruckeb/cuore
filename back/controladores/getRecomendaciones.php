<?php
    require_once '../basesDeDatos/bdCuore.php';
    $recomendaciones = getRecomendacionesBBDD();
    $json = json_encode($recomendaciones);
    echo $json;

/* 
    CODIGOS DE ERROR 
    510
    999

*/
