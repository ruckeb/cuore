<?php
    // require_once '../basesDeDatos/bdCuore.php';
    // $usuario = actualizarMatchBBDD();
    $usuario = array(
        'amor' => true
    );
    $json = json_encode($usuario);
    echo $json;
   