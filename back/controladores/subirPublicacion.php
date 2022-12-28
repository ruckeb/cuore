<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './subirArchivo.php';
    $archivo = $_FILES['archivo'];
    $datos = json_decode($_REQUEST['bodyContent']);
    try {
        $ruta_archivo = subirArchivoAlServidor($archivo);
        if ($ruta_archivo == 509) {
            return $ruta_archivo;
        }
        $perfil = subirPublicacionBBDD($ruta_archivo, $datos);
    } catch (\Throwable $th) {
        borrarFicheroServidor($ruta_archivo);
    } 
    $json = json_encode($perfil);
    echo $json;