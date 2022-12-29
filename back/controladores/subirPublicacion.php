<?php
    require_once '../basesDeDatos/bdCuore.php';
    require_once './validacionFormularios.php';
    require_once './subirArchivo.php';
    $archivo = $_FILES['archivo'];
    $datos = json_decode($_REQUEST['bodyContent']);
    $codigo_error = validarSubirPublicacion($archivo, $datos);
    if ($codigo_error == 0) {
        try {
            $ruta_archivo = subirArchivoAlServidor($archivo);
            if ($ruta_archivo == 509) {
                $codigo_error = 509;
            } else {
                $codigo_error = subirPublicacionBBDD($ruta_archivo, $datos);
            }
        } catch (\Throwable $th) {
            borrarFicheroServidor($ruta_archivo);
        } 
    }
    $json = json_encode($codigo_error);
    echo $json;