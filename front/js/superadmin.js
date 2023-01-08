import { getCookie, setCookie, buscarLiteral } from "./utils.js";
var literales
var usuario_logueado

window.onload = ()=>{

    function cargarLiterales() {
        let bodyContent = {
            id_html: 'superadmin',
        }
        let url = '../../back/controladores/cargarLiterales.php'
        let params = {
            method: 'POST',
            body: JSON.stringify(bodyContent)
        }
        fetch(url, params)
            .then(req => req.json())
            .then( literales_fetch => {
                literales = literales_fetch
                cargarUsuarioLogueado()
            })
    }

    function cargarUsuarioLogueado() {
        let url = '../../back/controladores/getUsuarioLogeado.php'
        let params = {
            method: 'GET',
        }
        fetch(url, params)
            .then(req => req.json())
            .then( usuario => {
                if (usuario.nick) {
                    usuario_logueado = usuario
                    if (usuario_logueado.superadmin == 0) {
                        Swal.fire({
                            text: buscarLiteral(literales, 'restringido_superadmin'),
                            title: 'Oops...',
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        .then(()=>{
                            location.href = 'home.php'
                        })
                    } else {
                        cargarSuperadmin()
                    }
                } else {
                    if (usuario == 999) {
                        Swal.fire({
                            text: buscarLiteral(literales, 'server_error_' + usuario),
                            title: 'Oops...',
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        .then(()=>{
                            location.href = 'index.html'
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: buscarLiteral(literales, "server_error_" + usuario),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                }
            })
    }

    var lenguaje_actual = getCookie("idioma")
    if (lenguaje_actual == null) {
        setCookie("idioma", "es", 7)
    } else {
        setCookie("idioma", lenguaje_actual, 7) //actualiza la cookie
    }

    cargarLiterales()
}

function cargarSuperadmin() {
    cargarCabecera()
    cargarMain()
    cargarFooter()
}

function cargarCabecera() {
    let header = document.body.children[0]

    let imagen_logo_cuore = document.createElement('img')
    imagen_logo_cuore.id = "logo"
    imagen_logo_cuore.src = "front/img/imgLogo/logo.png"
    imagen_logo_cuore.title = "Logo"
    imagen_logo_cuore.onclick = () => {
        location.reload()
    }

    let div_botones_login = document.createElement('div')
    div_botones_login.id = "botones_login"

    let cerrar_sesion = document.createElement('button')
    cerrar_sesion.id = "cerrar_sesion"
    cerrar_sesion.classList.add("boton_cabecera")
    cerrar_sesion.innerHTML = buscarLiteral(literales, cerrar_sesion.id)
    cerrar_sesion.onclick = e => {
        e.preventDefault()
        location.href = 'back/controladores/cerrarSesion.php'
    }

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
    imagen_bandera_espana.src = "front/img/imgPaises/espana.png"
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
    imagen_bandera_reino_unido.src = "front/img/imgPaises/reino-unido.png"
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
    imagen_bandera_francia.src = "front/img/imgPaises/francia.png"
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
    imagen_bandera_alemania.src = "front/img/imgPaises/alemania.png"
    boton_alemania.appendChild(imagen_bandera_alemania)

    
    div_botones_login.appendChild(cerrar_sesion)
    div_botones_login.appendChild(boton_espana)
    div_botones_login.appendChild(boton_reino_unido)
    div_botones_login.appendChild(boton_francia)
    div_botones_login.appendChild(boton_alemania)

    header.appendChild(imagen_logo_cuore)
    header.appendChild(div_botones_login)

}

function cargarMain() {
    let url = '../../back/controladores/getUsuarios.php'
    let params = {
        method: 'GET',
    }
    fetch(url, params)
        .then(req => req.json())
        .then( usuarios => {
            // console.log(usuarios)
            cargarBuscador(usuarios)
            input_buscador.onkeyup = (e) => {
                let usuarios_filtrados = JSON.parse(JSON.stringify(usuarios));
                usuarios_filtrados = usuarios_filtrados.filter(usuario => {return usuario.nick.indexOf(e.target.value)>-1})
                cargarBuscador(usuarios_filtrados)
            }
        })
    
    let main = document.body.children[1]
    main.innerHTML = ""

    let bloque1 = document.createElement('div')
    bloque1.id = "bloque1"

    let caja_buscador = document.createElement('div')
    caja_buscador.id = "caja_buscador"

    let input_buscador = document.createElement('input')
    input_buscador.id = "input_buscador"
    input_buscador.type = "text"
    input_buscador.name = "input_buscador"
    input_buscador.placeholder = buscarLiteral(literales, input_buscador.id)

    let imagen_buscador = document.createElement('img')
    imagen_buscador.id = "imagen_buscador"
    imagen_buscador.src = "front/img/imgChatPrivado/lupa.png"

    caja_buscador.appendChild(imagen_buscador)
    caja_buscador.appendChild(input_buscador)

    let caja_usuarios = document.createElement('div')
    caja_usuarios.id = "caja_usuarios"

    bloque1.appendChild(caja_buscador)
    bloque1.appendChild(caja_usuarios)

    let bloque2 = document.createElement('div')
    bloque2.id = "bloque2"

    main.appendChild(bloque1)
    main.appendChild(bloque2)

}

function cargarBuscador(usuarios) {
    let caja_usuarios = document.getElementById("caja_usuarios")
    caja_usuarios.innerHTML = ""
    for (const usuario of usuarios) {
        let caja_usuario = document.createElement('div')
        caja_usuario.class = "caja_usuario"

        let nick_usuario = document.createElement('h1')
        nick_usuario.class = "nick_usuario"  
        nick_usuario.innerHTML = usuario.nick 
        nick_usuario.onclick = (e) => {
            cargarBloque2(e.target.innerHTML)
        }

        caja_usuario.appendChild(nick_usuario)

        caja_usuarios.appendChild(caja_usuario)
    }
}

function cargarBloque2(nick){
    let bloque2 = document.getElementById("bloque2")
    if (!bloque2.classList.contains(nick)) {

        let bodyContent = {
            nick: nick
        }
        let url = '../../back/controladores/getUsuario.php'
        let params = {
            method: 'POST',
            body: JSON.stringify(bodyContent)
        }
        fetch(url, params)
            .then(req => req.json())
            .then( usuario => {
                if (usuario.nick) {
                    function boton_mostrar_contrasena(e) {
                        e.preventDefault()
                        let input = this.nextSibling
                        if (input.type == 'password') {
                            input.type = 'text'
                        }else{
                            input.type = 'password'
                        }
                    }
                    bloque2.innerHTML = ""
                    bloque2.classList = usuario.nick
                    let formulario = document.createElement('form')
                    formulario.id = "superadmin_form"
                    formulario.name = "superadmin_form"

                    let h1_nick_usuario = document.createElement('h1')
                    h1_nick_usuario.innerHTML = usuario.nick

                    let div_email = document.createElement('div')

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
                    input_email.value = usuario.email

                    div_email.appendChild(label_email)
                    div_email.appendChild(input_email)

                    let div_premium = document.createElement('div')

                    let label_premium = document.createElement('label')
                    label_premium.id = "label_premium"
                    label_premium.htmlFor = "premium"
                    label_premium.innerHTML = buscarLiteral(literales, label_premium.id)

                    let select_premium = document.createElement('select')
                    select_premium.id = "select_premium"
                    select_premium.name = "select_premium"

                    let option_0 = document.createElement('option')
                    option_0.value = 0
                    option_0.innerHTML = 0

                    let option_1 = document.createElement('option')
                    option_1.value = 1
                    option_1.innerHTML = 1

                    if (usuario.premium==0) {
                        option_0.selected = true
                    } else {
                        option_1.selected = true
                    }

                    select_premium.appendChild(option_0)
                    select_premium.appendChild(option_1)

                    div_premium.appendChild(label_premium)
                    div_premium.appendChild(select_premium)                    

                    let div_contrasena = document.createElement('div')

                    let label_clave = document.createElement('label')
                    label_clave.id = "label_clave"
                    label_clave.htmlFor = "clave_registro"
                    label_clave.innerHTML = buscarLiteral(literales, label_clave.id)

                    let div_input_ojo = document.createElement('div')

                    let input_clave = document.createElement('input')
                    input_clave.id = "clave_registro"
                    input_clave.type = "password"
                    input_clave.name = "clave_registro"
                    input_clave.minLength = 8 
                    input_clave.maxLength = 20
                    input_clave.pattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$"
                    input_clave.title = buscarLiteral(literales, input_clave.id + "_title")

                    let boton_ojo_contrasena = document.createElement('button')
                    boton_ojo_contrasena.id = "ojo_contrasena"
                    boton_ojo_contrasena.innerHTML = "👁"
                    boton_ojo_contrasena.onclick = boton_mostrar_contrasena 

                    div_input_ojo.appendChild(boton_ojo_contrasena)
                    div_input_ojo.appendChild(input_clave)

                    div_contrasena.appendChild(label_clave)
                    div_contrasena.appendChild(div_input_ojo)

                    let div_botones_form = document.createElement('div')
                    div_botones_form.id = "div_botones_form"

                    let boton_actualizar = document.createElement('button')
                    boton_actualizar.id = "boton_actualizar"
                    boton_actualizar.innerHTML = buscarLiteral(literales, boton_actualizar.id)
                    boton_actualizar.onclick = (e) => {
                        e.preventDefault()
                        if (formulario.reportValidity()) {
                            let formulario2 = e.target.parentNode.parentNode 
                            let bodyContent = {
                                nick: formulario2.children[0].innerHTML,
                                email: formulario.email.value,
                                clave: formulario.clave_registro.value,
                                premium: formulario.select_premium.value,
                            }
                            let url = '../../back/controladores/actualizarPerfilSuperadmin.php'
                            let params = {
                                method: 'POST',
                                body: JSON.stringify(bodyContent)
                            }
                            fetch(url, params)
                                .then(req => req.json())
                                .then( actualizado => {
                                    if (actualizado===true) {
                                        Swal.fire({
                                            text: buscarLiteral(literales, 'usuario_actualizado_correctamente'),
                                            title: buscarLiteral(literales, 'correcto'),
                                            icon: "success",
                                            timer: 2000,
                                            timerProgressBar: true,
                                            showConfirmButton: false,
                                            showClass: {
                                                popup: 'animate__animated animate__fadeInDown'
                                            },
                                            hideClass: {
                                                popup: 'animate__animated animate__fadeOutUp'
                                            }
                                        }).then(() => {
                                            let bodyContent = {
                                                destinatario: formulario.email.value,
                                                idioma: getCookie('idioma'),
                                                nick: formulario2.children[0].innerHTML,
                                                email: formulario.email.value,
                                                clave: formulario.clave_registro.value,
                                                premium: formulario.select_premium.value,
                                            }
                                            let url = '../../back/controladores/correo.php'
                                            let params = {
                                                method: 'POST',
                                                body: JSON.stringify(bodyContent)
                                            }
                                            fetch(url, params)
                                                .then(req => req.text())
                                                .then( enviado => {
                                                    if (enviado==false) {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Oops...',
                                                            text: buscarLiteral(literales, "error_envio_correo"),
                                                            showClass: {
                                                                popup: 'animate__animated animate__fadeInDown'
                                                            },
                                                            hideClass: {
                                                                popup: 'animate__animated animate__fadeOutUp'
                                                            }
                                                        })
                                                    }
                                                })
                                        })
                                    } else {
                                        if (actualizado == 999) {
                                            Swal.fire({
                                                text: buscarLiteral(literales, 'server_error_' + actualizado),
                                                title: 'Oops...',
                                                icon: "error",
                                                timer: 2000,
                                                timerProgressBar: true,
                                                showConfirmButton: false,
                                                showClass: {
                                                    popup: 'animate__animated animate__fadeInDown'
                                                },
                                                hideClass: {
                                                    popup: 'animate__animated animate__fadeOutUp'
                                                }
                                            })
                                            .then(()=>{
                                                location.href = 'index.html'
                                            })
                                        }else{
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: buscarLiteral(literales, "server_error_" + actualizado),
                                                showClass: {
                                                    popup: 'animate__animated animate__fadeInDown'
                                                },
                                                hideClass: {
                                                    popup: 'animate__animated animate__fadeOutUp'
                                                }
                                            })
                                        }
                                    }
                                })
                        }
                    }

                    let boton_borrar = document.createElement('button')
                    boton_borrar.id = "boton_borrar"
                    boton_borrar.innerHTML = buscarLiteral(literales, boton_borrar.id)
                    boton_borrar.onclick = (e) => {
                        e.preventDefault()
                        Swal.fire({
                            title: buscarLiteral(literales, 'titulo_borrar'), //estas seguro?
                            text: buscarLiteral(literales, 'texto_borrar'), //no podrás deshacer esta acción
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: buscarLiteral(literales, 'confirmar_alerta'),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                          }).then((result) => {
                            if (result.isConfirmed) {
                                //borrar usuario
                                let bodyContent = {
                                    nick: e.target.parentNode.parentNode.children[0].innerHTML,
                                }
                                let url = '../../back/controladores/borrarUsuario.php'
                                let params = {
                                    method: 'POST',
                                    body: JSON.stringify(bodyContent)
                                }
                                fetch(url, params)
                                    .then(req => req.json())
                                    .then( borrados => {
                                        if (borrados === true) {
                                            let caja_usuarios = document.getElementById('caja_usuarios')
                                            for (const caja_usuario of caja_usuarios.children) {
                                                if (caja_usuario.children[0].innerHTML == usuario.nick) {
                                                    caja_usuario.remove()
                                                }
                                            }
                                            bloque2.innerHTML = ""
                                            Swal.fire({
                                                text: buscarLiteral(literales, 'usuario_borrado_correctamente'), //borrado correctamente
                                                title: buscarLiteral(literales, 'correcto'),
                                                icon: "success",
                                                timer: 2000,
                                                timerProgressBar: true,
                                                showConfirmButton: false,
                                                showClass: {
                                                    popup: 'animate__animated animate__fadeInDown'
                                                },
                                                hideClass: {
                                                    popup: 'animate__animated animate__fadeOutUp'
                                                }
                                            })
                                        } else {
                                            if (borrados == 999) {
                                                Swal.fire({
                                                    text: buscarLiteral(literales, 'server_error_' + borrados),
                                                    title: 'Oops...',
                                                    icon: "error",
                                                    timer: 2000,
                                                    timerProgressBar: true,
                                                    showConfirmButton: false,
                                                    showClass: {
                                                        popup: 'animate__animated animate__fadeInDown'
                                                    },
                                                    hideClass: {
                                                        popup: 'animate__animated animate__fadeOutUp'
                                                    }
                                                })
                                                .then(()=>{
                                                    location.href = 'index.html'
                                                })
                                            }else{
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: buscarLiteral(literales, "server_error_" + borrados),
                                                    showClass: {
                                                        popup: 'animate__animated animate__fadeInDown'
                                                    },
                                                    hideClass: {
                                                        popup: 'animate__animated animate__fadeOutUp'
                                                    }
                                                })
                                            }
                                        }
                                    })
                            }
                          })
                        
                    }

                    div_botones_form.appendChild(boton_actualizar)
                    div_botones_form.appendChild(boton_borrar)

                    formulario.appendChild(h1_nick_usuario)
                    formulario.appendChild(div_email)
                    formulario.appendChild(div_premium)
                    formulario.appendChild(div_contrasena)
                    formulario.appendChild(div_botones_form)

                    bloque2.appendChild(formulario)

                } else {
                    if (usuario == 999) {
                        Swal.fire({
                            text: buscarLiteral(literales, 'server_error_' + usuario),
                            title: 'Oops...',
                            icon: "error",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        .then(()=>{
                            location.href = 'index.html'
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: buscarLiteral(literales, "server_error_" + usuario),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                    }
                }
            })
    }

}


function cargarFooter() {
    let footer = document.body.children[2]

    let p1 = document.createElement('p')
    p1.id ="copyRight"
    p1.innerHTML = "© Copyright 2022"

    let cajaDirecciones = document.createElement('div')
    cajaDirecciones.id = "cajaDirecciones"

    let p2 = document.createElement('p')
    p2.id ="p2"
    p2.innerHTML = "Cuore: "

    let instagram = document.createElement('img')
    instagram.src = "front/img/imgFooter/instagram.png"

    let instagram_enlace = document.createElement('a')
    instagram_enlace.id ="instagram_enlace"
    instagram_enlace.targer = "_blank"
    instagram_enlace.rel = "noopener noreferrer"
    instagram_enlace.href = "https://www.instagram.com/cuore__soporte/"

    instagram_enlace.appendChild(instagram)
    
    let facebook = document.createElement('img')
    facebook.src = "front/img/imgFooter/facebook.png"

    let facebook_enlace = document.createElement('a')
    facebook_enlace.id ="facebook_enlace"
    facebook_enlace.targer = "_blank"
    facebook_enlace.rel = "noopener noreferrer"
    facebook_enlace.href = "https://www.facebook.com/profile.php?id=100088263466164"

    facebook_enlace.appendChild(facebook)

    let twitter = document.createElement('img')
    twitter.src = "front/img/imgFooter/gorjeo.png"

    let twitter_enlace = document.createElement('a')
    twitter_enlace.id ="twitter_enlace"
    twitter_enlace.targer = "_blank"
    twitter_enlace.rel = "noopener noreferrer"
    twitter_enlace.href = "https://twitter.com/cuore_soporte"

    twitter_enlace.appendChild(twitter)

    let gmail = document.createElement('img')
    gmail.src = "front/img/imgFooter/gmail.png"

    let gmail_enlace = document.createElement('a')
    gmail_enlace.id ="gmail_enlace"
    gmail_enlace.targer = "_blank"
    gmail_enlace.rel = "noopener noreferrer"
    gmail_enlace.href = "mailto:cuore.soporte@gmail.com"

    gmail_enlace.appendChild(gmail)

    let linkedin = document.createElement('img')
    linkedin.src = "front/img/imgFooter/linkedin.png"

    let linkedin_enlace = document.createElement('a')
    linkedin_enlace.id ="linkedin_enlace"
    linkedin_enlace.targer = "_blank"
    linkedin_enlace.rel = "noopener noreferrer"
    linkedin_enlace.href = "https://www.linkedin.com/in/cuore-soporte-80310525b/"

    linkedin_enlace.appendChild(linkedin)

    let maps = document.createElement('img')
    maps.src = "front/img/imgFooter/marcador-de-posicion.png"

    let maps_enlace = document.createElement('a')
    maps_enlace.id ="maps_enlace"
    maps_enlace.targer = "_blank"
    maps_enlace.rel = "noopener noreferrer"
    maps_enlace.href = "https://goo.gl/maps/gX2vJPVcAYoJWxxd8"

    maps_enlace.appendChild(maps)

    cajaDirecciones.appendChild(p2)
    cajaDirecciones.appendChild(instagram_enlace)
    cajaDirecciones.appendChild(facebook_enlace)
    cajaDirecciones.appendChild(twitter_enlace)
    cajaDirecciones.appendChild(gmail_enlace)
    cajaDirecciones.appendChild(linkedin_enlace)
    cajaDirecciones.appendChild(maps_enlace)

    footer.appendChild(p1)
    footer.appendChild(cajaDirecciones)

}