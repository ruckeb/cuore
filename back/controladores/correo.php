<?php
$datosJson = file_get_contents("php://input");
$datos = json_decode($datosJson);
$para      = $datos->destinatario;
$asunto    = '';
$descripcion   = '';
switch ($datos->idioma) {
    case 'en':
        $asunto    = 'Updated profile';
        $premium = $datos->premium==1?'Yes':'No';
        $descripcion   = "<h2>Your profile has been updated, remember to change your password if it has been changed</h2>
                            <div style='text-align:center;'>
                                <table border='1' style='margin: 0 auto;'>
                                    <tr>
                                        <td>Nick</td>
                                        <td>$datos->nick</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>$datos->email</td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td>$datos->clave</td>
                                    </tr>
                                    <tr>
                                        <td>Premium</td>
                                        <td>$premium</td>
                                    </tr>
                                </table>
                            </div>";
        break;
    case 'fr':
        $asunto    = 'Profil mis à jour';
        $premium = $datos->premium==1?'Oui':'Pas';
        $descripcion   = "<h2>Votre profil a été mis à jour, pensez à changer votre mot de passe s'il a été modifié</h2>
                            <div style='text-align:center;'>
                                <table border='1' style='margin: 0 auto;'>
                                    <tr>
                                        <td>Pseudo</td>
                                        <td>$datos->nick</td>
                                    </tr>
                                    <tr>
                                        <td>E-mail</td>
                                        <td>$datos->email</td>
                                    </tr>
                                    <tr>
                                        <td>Le mot de passe</td>
                                        <td>$datos->clave</td>
                                    </tr>
                                    <tr>
                                        <td>Prime</td>
                                        <td>$premium</td>
                                    </tr>
                                </table>
                            </div>";
        break;
    case 'de':
        $asunto    = 'Aktualisiertes profil';
        $premium = $datos->premium==1?'Ja':'Nicht';
        $descripcion   = "<h2>Ihr profil wurde aktualisiert, denken Sie daran, Ihr Passwort zu ändern, wenn es geändert wurde</h2>
                            <div style='text-align:center;'>
                                <table border='1' style='margin: 0 auto;'>
                                    <tr>
                                        <td>Nick</td>
                                        <td>$datos->nick</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>$datos->email</td>
                                    </tr>
                                    <tr>
                                        <td>Passwort</td>
                                        <td>$datos->clave</td>
                                    </tr>
                                    <tr>
                                        <td>Prämie</td>
                                        <td>$premium</td>
                                    </tr>
                                </table>
                            </div>";
        break;
    default:
        $asunto    = 'Perfil actualizado';
        $premium = $datos->premium==1?'Sí':'No';
        $descripcion   = "<h2>Su perfil ha sido actualizado, recuerde cambiar su contraseña si ha sido modificada</h2>
                            <div style='text-align:center;'>
                                <table border='1' style='margin: 0 auto;'>
                                    <tr>
                                        <td>Nick</td>
                                        <td>$datos->nick</td>
                                    </tr>
                                    <tr>
                                        <td>Correo</td>
                                        <td>$datos->email</td>
                                    </tr>
                                    <tr>
                                        <td>Clave</td>
                                        <td>$datos->clave</td>
                                    </tr>
                                    <tr>
                                        <td>Premium</td>
                                        <td>$premium</td>
                                    </tr>
                                </table>
                            </div>";
        break;
}
$headers = 'From: cuore.soporte@gmail.com'."\r\n" .
            'Reply-To: cuore.soporte@gmail.com'."\r\n" .
            "Content-Type: text/html; charset=utf-8\r\n" .
            'X-Mailer: PHP/' . phpversion();

if (mail($para, $asunto, $descripcion, $headers))
{
    echo true;
}
?>