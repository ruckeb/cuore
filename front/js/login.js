import { getCookie, setCookie, buscarLiteral } from "./utils.js";
window.onload = ()=>{

    var lenguaje_actual = getCookie("idioma")
    if (lenguaje_actual == null) {
        setCookie("idioma", "es", 7)
    } else {
        setCookie("idioma", lenguaje_actual, 7) //actualiza la cookie
    }

    cargarLogin()
}

function cargarLogin() {
    let bodyContent = {
        id_html: 'login',
    }
    let url = '../../back/controladores/cargarLiterales.php'
    let params = {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    }
    fetch(url, params)
        .then(req => req.json())
        .then( literales => {
            cargarCabecera(literales)
            cargarMain(literales)
            cargarFooter(literales)
        })
}

function cargarCabecera(literales) {
    let header = document.body.children[0]

    let imagen_logo_cuore = document.createElement('img')
    imagen_logo_cuore.id = "logo"
    imagen_logo_cuore.src = "../img/imgLogo/logo.png"
    imagen_logo_cuore.title = "Logo"
    imagen_logo_cuore.onclick = () => {
        location.reload()
    }

    let div_botones_login = document.createElement('div')
    div_botones_login.id = "botones_login"

    let boton_espana = document.createElement('button')
    boton_espana.id = "boton_espana"
    boton_espana.classList.add("botonIdiomas")
    boton_espana.onclick = () => {
        if (getCookie("idioma") != "es") {
            setCookie("idioma", "es", 7)
            location.reload()
        }
    }

    let imagen_bandera_espana = document.createElement('img')
    imagen_bandera_espana.id = "espana"
    imagen_bandera_espana.src = "../img/imgPaises/espana.png"
    boton_espana.appendChild(imagen_bandera_espana)

    let boton_reino_unido = document.createElement('button')
    boton_reino_unido.id = "boton_reino_unido"
    boton_reino_unido.classList.add("botonIdiomas")
    boton_reino_unido.onclick = () => {
        if (getCookie("idioma") != "en") {
            setCookie("idioma", "en", 7)
            location.reload()
        }
    }

    let imagen_bandera_reino_unido = document.createElement('img')
    imagen_bandera_reino_unido.id = "reino-unido"
    imagen_bandera_reino_unido.src = "../img/imgPaises/reino-unido.png"
    boton_reino_unido.appendChild(imagen_bandera_reino_unido)

    let boton_francia = document.createElement('button')
    boton_francia.id = "boton_francia"
    boton_francia.classList.add("botonIdiomas")
    boton_francia.onclick = () => {
        if (getCookie("idioma") != "fr") {
            setCookie("idioma", "fr", 7)
            location.reload()
        }
    }

    let imagen_bandera_francia = document.createElement('img')
    imagen_bandera_francia.id = "francia"
    imagen_bandera_francia.src = "../img/imgPaises/francia.png"
    boton_francia.appendChild(imagen_bandera_francia)

    let boton_alemania = document.createElement('button')
    boton_alemania.id = "boton_alemania"
    boton_alemania.classList.add("botonIdiomas")
    boton_alemania.onclick = () => {
        if (getCookie("idioma") != "de") {
            setCookie("idioma", "de", 7)
            location.reload()
        }
    }

    let imagen_bandera_alemania = document.createElement('img')
    imagen_bandera_alemania.id = "alemania"
    imagen_bandera_alemania.src = "../img/imgPaises/alemania.png"
    boton_alemania.appendChild(imagen_bandera_alemania)

    let boton_iniciar_sesion = document.createElement('button')
    boton_iniciar_sesion.id = "iniciar_sesion"
    boton_iniciar_sesion.innerHTML = buscarLiteral(literales, boton_iniciar_sesion.id)
    boton_iniciar_sesion.onclick = e => {
        e.preventDefault()
        document.getElementById("formulario_inicio").style.display = "block"
        document.getElementById("formulario_registro").style.display = "none"
        boton_iniciar_sesion.style.backgroundColor = "rgb(245, 98, 135)"
        boton_registrarse.style.backgroundColor = "white"
        boton_iniciar_sesion.style.color = "black"
        boton_registrarse.style.color = "black"
    }

    let boton_registrarse = document.createElement('button')
    boton_registrarse.id = "registrarse"
    boton_registrarse.innerHTML = buscarLiteral(literales, boton_registrarse.id)
    boton_registrarse.onclick = e => {
        e.preventDefault()
        document.getElementById("formulario_inicio").style.display = "none"
        document.getElementById("formulario_registro").style.display = "block"
        boton_registrarse.style.backgroundColor = "rgb(245, 98, 135)"
        boton_iniciar_sesion.style.backgroundColor = "white"
        boton_iniciar_sesion.style.color = "black"
        boton_registrarse.style.color = "black"
    }

    div_botones_login.appendChild(boton_espana)
    div_botones_login.appendChild(boton_reino_unido)
    div_botones_login.appendChild(boton_francia)
    div_botones_login.appendChild(boton_alemania)
    div_botones_login.appendChild(boton_iniciar_sesion)
    div_botones_login.appendChild(boton_registrarse)

    header.appendChild(imagen_logo_cuore)
    header.appendChild(div_botones_login)

}

function cargarMain(literales) {
    let main = document.body.children[1]

    let div_animacion = document.createElement('div')
    div_animacion.id = "animacion"

    let fondo_sin_formulario1 = document.createElement('h1')
    fondo_sin_formulario1.id = "fondo"
    fondo_sin_formulario1.innerHTML = "CU"

    let fondo_sin_formulario2 = document.createElement('h1')
    fondo_sin_formulario2.id = "fondo2"
    fondo_sin_formulario2.innerHTML = "ORE"

    div_animacion.appendChild(fondo_sin_formulario1)
    div_animacion.appendChild(fondo_sin_formulario2)

    let formulario_inicio = document.createElement('form')
    formulario_inicio.id = "formulario_inicio"

    let label_usuario = document.createElement('label')
    label_usuario.id = "label_usuario"
    label_usuario.htmlFor = "usuarios"
    label_usuario.innerHTML = buscarLiteral(literales, label_usuario.id)

    let input_usuario = document.createElement('input')
    input_usuario.id = "usuario"
    input_usuario.type = "text"
    input_usuario.name = "usuario"
    input_usuario.required = true

    let label_contrasena = document.createElement('label')
    label_contrasena.id = "label_contrasena"
    label_contrasena.htmlFor = "clave"
    label_contrasena.innerHTML = buscarLiteral(literales, label_contrasena.id)

    let input_contrasena = document.createElement('input')
    input_contrasena.id = "clave"
    input_contrasena.type = "password"
    input_contrasena.name = "clave"
    input_usuario.required = true

    let boton_enviar = document.createElement('button')
    boton_enviar.id = "entrar"
    boton_enviar.type = "submit"
    boton_enviar.innerHTML = buscarLiteral(literales, boton_enviar.id)

    formulario_inicio.appendChild(label_usuario)
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(input_usuario)
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(label_contrasena)
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(input_contrasena)
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(boton_enviar)

    let formulario_registro = document.createElement('form')
    formulario_registro.id = "formulario_registro"

    let label_nick = document.createElement('label')
    label_nick.id = "label_nick"
    label_nick.htmlFor = "nick"
    label_nick.innerHTML = buscarLiteral(literales, label_nick.id)

    let input_nick = document.createElement('input')
    input_nick.id = "nick"
    input_nick.type = "text"
    input_nick.name = "nick" 
    input_nick.required = true
   
    let label_email = document.createElement('label')
    label_email.id = "label_email"
    label_email.htmlFor = "email"
    label_email.innerHTML = buscarLiteral(literales, label_email.id)

    let input_email = document.createElement('input')
    input_email.id = "email"
    input_email.type = "email"
    input_email.name = "email" 
    input_email.required = true

    let label_rol = document.createElement('label')
    label_rol.id = "label_rol"
    label_rol.htmlFor = "rol"
    label_rol.innerHTML = buscarLiteral(literales, label_rol.id)

    let input_rol = document.createElement('input')
    input_rol.id = "rol"
    input_rol.type = "text"
    input_rol.name = "rol" 
    input_rol.required = true

    let label_imagen = document.createElement('label')
    label_imagen.id = "label_imagen"
    label_imagen.htmlFor = "imagen"
    label_imagen.innerHTML = buscarLiteral(literales, label_imagen.id)

    let input_imagen = document.createElement('input')
    input_imagen.id = "imagen"
    input_imagen.type = "file"
    input_imagen.name = "imagen" 
    input_imagen.accept = ".png,.jpg,jpeg"
    input_imagen.required = true

    let label_video = document.createElement('label')
    label_video.id = "label_video"
    label_video.htmlFor = "video"
    label_video.innerHTML = buscarLiteral(literales, label_video.id)

    let input_video = document.createElement('input')
    input_video.id = "video"
    input_video.type = "file"
    input_video.name = "video" 
    input_video.accept = ""
    input_video.required = true

    let div_no_coinciden = document.createElement('div')
    div_no_coinciden.id = "noCoinciden"
    div_no_coinciden.classList.add("ocultar")
    div_no_coinciden.innerHTML = buscarLiteral(literales, div_no_coinciden.id)

    let div_coinciden = document.createElement('div')
    div_coinciden.id = "coinciden"
    div_coinciden.classList.add("ocultar")
    div_coinciden.innerHTML = buscarLiteral(literales, div_coinciden.id)

    let label_clave = document.createElement('label')
    label_clave.id = "label_clave"
    label_clave.htmlFor = "clave_registro"
    label_clave.innerHTML = buscarLiteral(literales, label_clave.id)

    let input_clave = document.createElement('input')
    input_clave.id = "clave_registro"
    input_clave.type = "password"
    input_clave.name = "clave_registro" 
    input_clave.maxLength = 8
    input_clave.required = true
    input_clave.onkeydown = () => {
        if (input_clave.innerHTML == input_repetir_clave) {
            div_coinciden.classList.remove("ocultar")
            div_no_coinciden.classList.add("ocultar")
        } else {
            div_coinciden.classList.add("ocultar")
            div_no_coinciden.classList.remove("ocultar")

        }
    }

    let label_repetir_clave = document.createElement('label')
    label_repetir_clave.id = "label_repetir_clave"
    label_repetir_clave.htmlFor = "clave_confirma"
    label_repetir_clave.innerHTML = buscarLiteral(literales, label_repetir_clave.id)

    let input_repetir_clave = document.createElement('input')
    input_repetir_clave.id = "clave_confirma"
    input_repetir_clave.type = "password"
    input_repetir_clave.name = "clave_confirma" 
    input_repetir_clave.maxLength = 8
    input_repetir_clave.required = true
    input_repetir_clave.onkeydown = () => {
        if (input_clave.innerHTML == input_repetir_clave) {
            div_coinciden.classList.remove("ocultar")
            div_no_coinciden.classList.add("ocultar")
        } else {
            div_coinciden.classList.add("ocultar")
            div_no_coinciden.classList.remove("ocultar")

        }
    }

    let boton_enviar_registro = document.createElement('button')
    boton_enviar_registro.id = "registrar"
    boton_enviar_registro.type = "submit"
    boton_enviar_registro.innerHTML = buscarLiteral(literales, boton_enviar_registro.id)

    formulario_registro.appendChild(label_nick)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_nick)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(label_email)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_email)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(label_rol)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_rol)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(label_imagen)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_imagen)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(label_video)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_video)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(label_clave)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_clave)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(label_repetir_clave)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(input_repetir_clave)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(div_coinciden)
    formulario_registro.appendChild(div_no_coinciden)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(boton_enviar_registro)


    main.appendChild(div_animacion)
    main.appendChild(formulario_inicio)
    main.appendChild(formulario_registro)
}

function cargarFooter(literales) {
    let footer = document.body.children[2]

    let p1 = document.createElement('p')
    p1.id ="p1"
    p1.innerHTML = "© Copyright 2022"

    let p2 = document.createElement('p')
    p2.id ="p2"
    p2.innerHTML = buscarLiteral(literales, p2.id)

    footer.appendChild(p1)
    footer.appendChild(p2)

}