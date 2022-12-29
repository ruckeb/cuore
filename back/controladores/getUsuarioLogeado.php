<?php
    session_start();
    $json = json_encode(array("usuario"=>$_SESSION['usuario']));
    echo $json;