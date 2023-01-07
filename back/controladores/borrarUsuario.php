<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    $datosJson = file_get_contents("php://input");
    $nick = json_decode($datosJson);
    $borrados = borrarUsuarioBBDD($nick);
    if (!is_numeric($borrados)) {
        foreach ($borrados as $borrado) {
            borrarFicheroServidor($borrado);
        }
        $borrados = true;
    }
    $json = json_encode($borrados);
    echo $json;