<?php
    session_start();
    if (!isset($_SESSION['token']) || !isset($_COOKIE['token']) || $_SESSION['token'] != $_COOKIE['token']) {
        header("Location: index.html");
    }
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil</title>
    <link rel="icon" type="image/x-icon" href="front/img/imgLogo/logo.png">
    <link rel="stylesheet" href="front/css/perfil.css">
    <script src="front/js/perfil.js" type="module"></script>
</head>

<body>
    <header></header>
    <main></main>
    <footer></footer>
</body>

</html>