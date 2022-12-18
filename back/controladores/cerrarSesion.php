<?php	
	session_start();	
	$_SESSION = array();
	session_destroy();	// eliminar la sesion
	setcookie(session_name(), 123, time() - 1000); // eliminar la cookie de sesion
	if (isset($_COOKIE['token'])) {
		setcookie('token', 123, time() - 1000); //elimino cookie de token
	}
	header("Location:../../index.html");
	