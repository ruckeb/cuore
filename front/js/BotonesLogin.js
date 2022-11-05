window.onload = ()=>{
    var inicio_sesion = document.getElementById("iniciar_sesion");
    var registro = document.getElementById("registrarse");

    var formulario_inicio = document.getElementById("formulario_inicio");
    var formulario_registro = document.getElementById("formulario_registro");

    inicio_sesion.onclick = function (e) {
        e.preventDefault();
        formulario_inicio.style.display = "block";
        formulario_registro.style.display = "none";
        inicio_sesion.style.backgroundColor = "rgb(245, 98, 135)";
        registro.style.backgroundColor = "white";
        inicio_sesion.style.color = "black";
        registro.style.color = "black";
    }

    registro.onclick = function (e) {
        e.preventDefault();
        formulario_registro.style.display = "block";
        formulario_inicio.style.display = "none";
        registro.style.backgroundColor = "rgb(245, 98, 135)";
        inicio_sesion.style.backgroundColor = "white";
        inicio_sesion.style.color = "black";
        registro.style.color = "black";
    }

}