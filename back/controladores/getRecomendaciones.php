<?php
    require_once '../basesDeDatos/bdCuore.php';
    $id = null;
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
    }
    $recomendaciones = getRecomendacionesBBDD($id);
    $json = json_encode($recomendaciones);
    echo $json;

/* 
    CODIGOS DE ERROR 
    510
    999

*/
