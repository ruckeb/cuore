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
const ERROR = "_error"

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
        document.getElementById("formulario_registro").style.display = "flex"
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
    input_usuario.maxLength = 50
    input_usuario.pattern = "/^[a-z0-9_-]{2,50}$/"
    input_usuario.title = buscarLiteral(literales, input_usuario.id + "_title")
    input_usuario.required = true

    function boton_mostrar_contrasena(e) {
        e.preventDefault()
        let input = this.previousSibling
        if (input.type == 'password') {
            input.type = 'text'
        }else{
            input.type = 'password'
        }
    }
    let boton_ojo_contrasena = document.createElement('button')
    boton_ojo_contrasena.id = "ojo_contrasena"
    boton_ojo_contrasena.innerHTML = "👁"
    boton_ojo_contrasena.onclick = boton_mostrar_contrasena 

    let label_contrasena = document.createElement('label')
    label_contrasena.id = "label_contrasena"
    label_contrasena.htmlFor = "clave"
    label_contrasena.innerHTML = buscarLiteral(literales, label_contrasena.id)

    let input_contrasena = document.createElement('input')
    input_contrasena.id = "clave"
    input_contrasena.type = "password"
    input_contrasena.name = "clave" 
    input_contrasena.minLength = 8 
    input_contrasena.maxLength = 20
    input_contrasena.required = true
    input_contrasena.pattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$"
    input_contrasena.title = buscarLiteral(literales, input_contrasena.id + "_title")

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
    formulario_inicio.appendChild(boton_ojo_contrasena)
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(document.createElement('br'))
    formulario_inicio.appendChild(boton_enviar)

    let formulario_registro = document.createElement('form')
    formulario_registro.id = "formulario_registro"
    formulario_registro.enctype = "multipart/form-data" //Esto es necesario porque este formulario incluye inputs de tipo file

    let fila1_registro = document.createElement('div')
    fila1_registro.id = "fila1_registro" 

    let label_nick = document.createElement('label')
    label_nick.id = "label_nick"
    label_nick.htmlFor = "nick"
    label_nick.innerHTML = buscarLiteral(literales, label_nick.id)

    let input_nick = document.createElement('input')
    input_nick.id = "nick"
    input_nick.type = "text"
    input_nick.name = "nick" 
    input_nick.maxLength = 50
    input_nick.pattern = "/^[a-z0-9_-]{2,50}$/"
    input_nick.title = buscarLiteral(literales, input_nick.id + "_title")
    input_nick.required = true
   
    let label_email = document.createElement('label')
    label_email.id = "label_email"
    label_email.htmlFor = "email"
    label_email.innerHTML = buscarLiteral(literales, label_email.id)

    let input_email = document.createElement('input')
    input_email.id = "email"
    input_email.type = "email"
    input_email.name = "email" 
    input_email.minLength = 5
    input_email.maxLength = 150
    input_email.pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    input_email.title = buscarLiteral(literales, input_email.id + "_title")
    input_email.required = true

    fila1_registro.appendChild(label_nick)
    fila1_registro.appendChild(input_nick)
    fila1_registro.appendChild(label_email)
    fila1_registro.appendChild(input_email)

    let fila2_registro = document.createElement('div')
    fila2_registro.id = "fila2_registro" 

    let label_fecha_nacimiento = document.createElement('label')
    label_fecha_nacimiento.id = "label_fecha_nacimiento"
    label_fecha_nacimiento.htmlFor = "fecha_nacimiento"
    label_fecha_nacimiento.innerHTML = buscarLiteral(literales, label_fecha_nacimiento.id)

    let input_fecha_nacimiento = document.createElement('input')
    input_fecha_nacimiento.id = "fecha_nacimiento"
    input_fecha_nacimiento.type = "Date"
    input_fecha_nacimiento.name = "fecha_nacimiento"
    input_fecha_nacimiento.required = true

    let label_sexo = document.createElement('label')
    label_sexo.id = "label_sexo"
    label_sexo.htmlFor = "sexo"
    label_sexo.innerHTML = buscarLiteral(literales, label_sexo.id)

    let select_sexo = document.createElement('select')
    select_sexo.id = "sexo"
    select_sexo.name = "sexo" 
    select_sexo.required = true
    
    let option_hombre = document.createElement('option')
    option_hombre.value = buscarLiteral(literales, select_sexo.id + '_hombre') 
    option_hombre.innerHTML = buscarLiteral(literales, select_sexo.id + '_hombre') 

    let option_mujer = document.createElement('option')
    option_mujer.value = buscarLiteral(literales, select_sexo.id + '_mujer') 
    option_mujer.innerHTML = buscarLiteral(literales, select_sexo.id + '_mujer')

    let option_otros = document.createElement('option')
    option_otros.value = buscarLiteral(literales, select_sexo.id + '_otros') 
    option_otros.innerHTML = buscarLiteral(literales, select_sexo.id + '_otros') 

    select_sexo.appendChild(option_hombre)
    select_sexo.appendChild(option_mujer)
    select_sexo.appendChild(option_otros)

    let label_busqueda = document.createElement('label')
    label_busqueda.id = "label_busqueda"
    label_busqueda.htmlFor = "busqueda"
    label_busqueda.innerHTML = buscarLiteral(literales, label_busqueda.id)

    let select_busqueda = document.createElement('select')
    select_busqueda.id = "busqueda"
    select_busqueda.name = "busqueda" 
    select_busqueda.required = true
    
    let option_bus_hombre = document.createElement('option')
    option_bus_hombre.value = buscarLiteral(literales, select_busqueda.id + '_hombre') 
    option_bus_hombre.innerHTML = buscarLiteral(literales, select_busqueda.id + '_hombre') 

    let option_bus_mujer = document.createElement('option')
    option_bus_mujer.value = buscarLiteral(literales, select_busqueda.id + '_mujer') 
    option_bus_mujer.innerHTML = buscarLiteral(literales, select_busqueda.id + '_mujer')

    let option_bus_ambos = document.createElement('option')
    option_bus_ambos.value = buscarLiteral(literales, select_busqueda.id + '_ambos') 
    option_bus_ambos.innerHTML = buscarLiteral(literales, select_busqueda.id + '_ambos') 

    fila2_registro.appendChild(label_fecha_nacimiento)
    fila2_registro.appendChild(input_fecha_nacimiento)
    fila2_registro.appendChild(label_sexo)
    fila2_registro.appendChild(select_sexo)
    fila2_registro.appendChild(label_busqueda)
    fila2_registro.appendChild(select_busqueda)
    select_busqueda.appendChild(option_bus_hombre)
    select_busqueda.appendChild(option_bus_mujer)
    select_busqueda.appendChild(option_bus_ambos)

    let fila3_registro = document.createElement('div')
    fila3_registro.id = "fila3_registro" 

    let label_imagen = document.createElement('label')
    label_imagen.id = "label_imagen"
    label_imagen.htmlFor = "imagen"
    label_imagen.innerHTML = buscarLiteral(literales, label_imagen.id)

    let input_imagen = document.createElement('input')
    input_imagen.id = "imagen"
    input_imagen.type = "file"
    input_imagen.name = "imagen" 
    input_imagen.accept = ".PNG,.JPG,.JPEG,.GIF,.TIFF,.PSD"
    input_imagen.title = buscarLiteral(literales, input_imagen.id + "_title")
    input_imagen.required = true

    let label_video = document.createElement('label')
    label_video.id = "label_video"
    label_video.htmlFor = "video"
    label_video.innerHTML = buscarLiteral(literales, label_video.id)

    let input_video = document.createElement('input')
    input_video.id = "video"
    input_video.type = "file"
    input_video.name = "video" 
    input_video.accept = ".MP4,.AVI,.MKV,.FLV,.MOV,.WMV,.DIVX,.H.264,.XVID,.RM"
    input_imagen.title = buscarLiteral(literales, input_video.id + "_title")
    input_video.required = true

    fila3_registro.appendChild(label_imagen)
    fila3_registro.appendChild(input_imagen)
    fila3_registro.appendChild(label_video)
    fila3_registro.appendChild(input_video)

    let fila4_registro = document.createElement('div')
    fila4_registro.id = "fila4_registro" 

    let div_no_coinciden = document.createElement('div')
    div_no_coinciden.id = "noCoinciden"
    div_no_coinciden.classList.add("ocultar")
    div_no_coinciden.innerHTML = buscarLiteral(literales, div_no_coinciden.id)

    let div_coinciden = document.createElement('div')
    div_coinciden.id = "coinciden"
    div_coinciden.classList.add("ocultar")
    div_coinciden.innerHTML = buscarLiteral(literales, div_coinciden.id)

    let boton_ojo_contrasena2 = document.createElement('button')
    boton_ojo_contrasena2.id = "ojo_contrasena2"
    boton_ojo_contrasena2.innerHTML = "👁"
    boton_ojo_contrasena2.onclick = boton_mostrar_contrasena 

    let label_clave = document.createElement('label')
    label_clave.id = "label_clave"
    label_clave.htmlFor = "clave_registro"
    label_clave.innerHTML = buscarLiteral(literales, label_clave.id)

    function comprobarContrasenas() {
        if (input_clave.value == input_repetir_clave.value) {
            div_coinciden.classList.remove("ocultar")
            div_no_coinciden.classList.add("ocultar")
        } else {
            div_coinciden.classList.add("ocultar")
            div_no_coinciden.classList.remove("ocultar")
        }
    }

    let input_clave = document.createElement('input')
    input_clave.id = "clave_registro"
    input_clave.type = "password"
    input_clave.name = "clave_registro"
    input_clave.minLength = 8 
    input_clave.maxLength = 20
    input_clave.required = true
    input_clave.pattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$"
    input_clave.title = buscarLiteral(literales, input_clave.id + "_title")
    input_clave.onkeyup = comprobarContrasenas

    let boton_ojo_contrasena3 = document.createElement('button')
    boton_ojo_contrasena3.id = "ojo_contrasena3"
    boton_ojo_contrasena3.innerHTML = "👁"
    boton_ojo_contrasena3.onclick = boton_mostrar_contrasena

    let label_repetir_clave = document.createElement('label')
    label_repetir_clave.id = "label_repetir_clave"
    label_repetir_clave.htmlFor = "clave_confirma"
    label_repetir_clave.innerHTML = buscarLiteral(literales, label_repetir_clave.id)

    let input_repetir_clave = document.createElement('input')
    input_repetir_clave.id = "clave_confirma"
    input_repetir_clave.type = "password"
    input_repetir_clave.name = "clave_confirma" 
    input_repetir_clave.minLength = 8 
    input_repetir_clave.maxLength = 20
    input_repetir_clave.required = true
    input_repetir_clave.pattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$"
    input_repetir_clave.title = buscarLiteral(literales, input_clave.id + "_title")
    input_repetir_clave.required = true
    input_repetir_clave.onkeyup = comprobarContrasenas

    fila4_registro.appendChild(div_no_coinciden)
    fila4_registro.appendChild(div_coinciden)
    fila4_registro.appendChild(label_clave)
    fila4_registro.appendChild(input_clave)
    fila4_registro.appendChild(boton_ojo_contrasena2)
    fila4_registro.appendChild(label_repetir_clave)
    fila4_registro.appendChild(input_repetir_clave)
    fila4_registro.appendChild(boton_ojo_contrasena3)

    let boton_enviar_registro = document.createElement('button')
    boton_enviar_registro.id = "registrar"
    boton_enviar_registro.type = "submit"
    boton_enviar_registro.innerHTML = buscarLiteral(literales, boton_enviar_registro.id)
    boton_enviar_registro.onclick = (e) => {
        e.preventDefault()
        if (formulario_registro.reportValidity()) {
            /*enviarRegistroAServidor(formulario_registro)*/
            console.log('validado')
            let bodyContent = {
                id_html: 'login',
            }
            let data = FormData()
            data.append('imagen', formulario_registro.input_imagen.files[0])
            data.append('video', formulario_registro.input_video.files[0])
            data.append(JSON.stringify(bodyContent))
            let url = '../../back/controladores/registrarUsuario.php'
            let params = {
                method: 'POST',
                body: data
            }
            fetch(url, params)
                .then(req => req.json())
                .then( datos => {
                    console.log(datos)
                })
        }
    }

    formulario_registro.appendChild(fila1_registro)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(fila2_registro)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(fila3_registro)
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(document.createElement('br'))
    formulario_registro.appendChild(fila4_registro)
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