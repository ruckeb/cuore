import { getCookie, setCookie, buscarLiteral } from "./utils.js";

window.onload = ()=>{
    var lenguaje_actual = getCookie("idioma")
    if (lenguaje_actual == null) {
        setCookie("idioma", "es", 7)
    } else {
        setCookie("idioma", lenguaje_actual, 7) //actualiza la cookie
    }

    cargarHome()

}
var usuario_logueado
let url = '../../back/controladores/getUsuarioLogeado.php'
let params = {
    method: 'GET',
}
fetch(url, params)
    .then(req => req.json())
    .then( usuario => {
        usuario_logueado = usuario
    })

function cargarHome() {
    cargarFooter()
    let bodyContent = {
        id_html: 'home',
    }
    let url = '../../back/controladores/cargarLiterales.php'
    let params = {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    }
    fetch(url, params)
        .then(req => req.json())
        .then( literales => {
            let url2 = '../../back/controladores/getRecomendaciones.php'
            let url_actual = new URL(location.href);
            let id = url_actual.searchParams.get("id");
            if (id!=null) {
                url2= url2 + "?id=" + id
            }
            let params2 = {
                method: 'GET',
            }
            fetch(url2, params2)
                .then(req => req.json())
                .then( recomendaciones => {
                    var index = 0
                    if (id!=null) {
                        for (let i = 0; i < recomendaciones.length; i++) {
                            const element = recomendaciones[i];
                            if (element.id == id) {
                                index = i
                                break;
                            }
                        }
                    }
                    cargarMain(recomendaciones, index, literales)
                })
            cargarCabecera(literales)
        })
    
}

function cargarCabecera(literales) {
    let header = document.body.children[0]

    let imagen_logo_cuore = document.createElement('img')
    imagen_logo_cuore.id = "logo"
    imagen_logo_cuore.src = "front/img/imgLogo/logo.png"
    imagen_logo_cuore.title = "Logo"
    imagen_logo_cuore.onclick = () => {
        location.href = 'home.php'
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

    let boton_menu = document.createElement('button')
    boton_menu.id = "boton_menu"
    boton_menu.classList.add("botonIdiomas")
    boton_menu.onclick = () => {
        div_contenedor_menu.classList.toggle("ocultar")
    }

    let imagen_menu = document.createElement('img')
    imagen_menu.id = "menu"
    imagen_menu.src = "front/img/imgMenu/menu.png"
    boton_menu.appendChild(imagen_menu)

    let div_contenedor_menu = document.createElement('div')
    div_contenedor_menu.id = "disMenu"
    div_contenedor_menu.classList.add("ocultar")

    let div_tabla_menu = document.createElement('div')
    div_tabla_menu.id = "tablaMenu"

    let boton_menu1 = document.createElement('button')
    boton_menu1.id = "boton_menu1"
    boton_menu1.classList.add("btnMenu")
    boton_menu1.onclick = (e) => {
        e.preventDefault()
        location.href = 'perfil.php' 
    }

    let p_menu1 = document.createElement('p')
    p_menu1.id = "p_menu1"
    p_menu1.innerHTML = buscarLiteral(literales, p_menu1.id) //Caja1
    
    boton_menu1.appendChild(p_menu1)

    let boton_menu2 = document.createElement('button')
    boton_menu2.id = "boton_menu2"
    boton_menu2.classList.add("btnMenu")
    boton_menu2.onclick = (e) => {
        e.preventDefault()
         // location.href = 'chatPrivado.php' 
    }

    let p_menu2 = document.createElement('p')
    p_menu2.id = "p_menu2"
    p_menu2.innerHTML = buscarLiteral(literales, p_menu2.id) //Caja2

    boton_menu2.appendChild(p_menu2)

    let boton_menu3 = document.createElement('button')
    boton_menu3.id = "boton_menu3"
    boton_menu3.classList.add("btnMenu")
    boton_menu3.onclick = (e) => {
        e.preventDefault()
         // location.href = 'sugerenciasCuore.php' 
    }

    let p_menu3 = document.createElement('p')
    p_menu3.id = "p_menu3"
    p_menu3.innerHTML = buscarLiteral(literales, p_menu3.id) //Caja3

    boton_menu3.appendChild(p_menu3)

    let boton_menu4 = document.createElement('button')
    boton_menu4.id = "boton_menu4"
    boton_menu4.classList.add("btnMenu")
    boton_menu3.onclick = (e) => {
        e.preventDefault()
         // location.href = 'contactanos.php' 
    }

    let p_menu4 = document.createElement('p')
    p_menu4.id = "p_menu4"
    p_menu4.innerHTML = buscarLiteral(literales, p_menu4.id) //Caja4

    boton_menu4.appendChild(p_menu4)

    let boton_menu5 = document.createElement('button')
    boton_menu5.id = "boton_menu5"
    boton_menu5.classList.add("btnMenu")
    boton_menu5.onclick = (e) => {
        e.preventDefault()
        location.href = 'back/controladores/cerrarSesion.php' 
    }

    let p_menu5 = document.createElement('p')
    p_menu5.id = "p_menu5"
    p_menu5.innerHTML = buscarLiteral(literales, p_menu5.id) //Caja5

    boton_menu5.appendChild(p_menu5)

    div_tabla_menu.appendChild(boton_menu1)
    div_tabla_menu.appendChild(boton_menu2)
    div_tabla_menu.appendChild(boton_menu3)
    div_tabla_menu.appendChild(boton_menu4)
    div_tabla_menu.appendChild(boton_menu5)

    div_contenedor_menu.appendChild(div_tabla_menu)

    div_botones_login.appendChild(boton_espana)
    div_botones_login.appendChild(boton_reino_unido)
    div_botones_login.appendChild(boton_francia)
    div_botones_login.appendChild(boton_alemania)
    div_botones_login.appendChild(boton_menu)

    header.appendChild(imagen_logo_cuore)
    header.appendChild(div_botones_login)
    header.appendChild(div_contenedor_menu)

}

function cargarMain(recomendaciones, index, literales) {
    let main = document.body.children[1]
    main.innerHTML = ""

    if (recomendaciones.length > 0) {
        let recomendacion = recomendaciones[index]

        let url = '../../back/controladores/getPublicacion.php?id='+recomendacion.id
        let params = {
            method: 'GET',
        }
        fetch(url, params)
            .then(req => req.json())
            .then( publicacion => {
                
                let c_recomendaciones_img = document.createElement('div')
                c_recomendaciones_img.id = "c_recomendaciones_img"
            
                let imagen_flecha_izq = document.createElement('img')
                imagen_flecha_izq.id = "flecha_izq"
                imagen_flecha_izq.classList.add("flecha")
                imagen_flecha_izq.src = "front/img/imgHome/flecha-izq-negro-rosa.png"
                if (index == 0) {
                    imagen_flecha_izq.onclick = () => {}
                    imagen_flecha_izq.classList.add("flecha_desactivada")
                } else {
                    imagen_flecha_izq.onclick = e => {
                        e.preventDefault()
                        index = index - 1
                        cargarMain(recomendaciones, index, literales)
                    }
                }

                let img_recomendacion = document.createElement('img')
                img_recomendacion.id = "img_recomendacion"
                img_recomendacion.src = publicacion.imagen
            
                let imagen_flecha_der = document.createElement('img')
                imagen_flecha_der.id = "flecha_der"
                imagen_flecha_der.classList.add("flecha")
                imagen_flecha_der.src = "front/img/imgHome/flecha-der-negro-rosa.png"
                if (index == recomendaciones.length - 1) {
                    imagen_flecha_der.onclick = () => {}
                    imagen_flecha_der.classList.add("flecha_desactivada")
                } else {
                    imagen_flecha_der.onclick = e => {
                        e.preventDefault()
                        index = index + 1
                        cargarMain(recomendaciones, index, literales)
                    }
                }
            
                let contenedor_datos_imagen = document.createElement('div')
                contenedor_datos_imagen.id = "contenedor_datos_imagen"
            
                let usuario_imagen = document.createElement('p')
                usuario_imagen.id = "usuario_imagen"
                usuario_imagen.innerHTML = publicacion.nick
                usuario_imagen.onclick = () => {
                    location.href = "perfil.php?usuario=" + publicacion.nick
                }
            
                let comentario_usuario_imagen = document.createElement('div')
                comentario_usuario_imagen.id = "comentario_usuario_imagen"
                comentario_usuario_imagen.innerHTML = publicacion.texto ? publicacion.texto : ""
            
                contenedor_datos_imagen.appendChild(usuario_imagen)
                contenedor_datos_imagen.appendChild(comentario_usuario_imagen)
            
                c_recomendaciones_img.appendChild(imagen_flecha_izq)
                c_recomendaciones_img.appendChild(img_recomendacion)
                c_recomendaciones_img.appendChild(imagen_flecha_der)
                c_recomendaciones_img.appendChild(contenedor_datos_imagen)
            
                let c_img_click = document.createElement('div')
                c_img_click.id = "c_img_click"
            
                let contenedor_comentarios = document.createElement('div')
                contenedor_comentarios.id = "contenedor_comentarios"
            
                for (const comentario of publicacion.comentarios) {
                    let parrafo_comentario = document.createElement('p')
                    parrafo_comentario.id = comentario.id_comentario
                    parrafo_comentario.classList.add('comentarios')
                
                    let fecha_comentario = document.createElement('span')
                    fecha_comentario.classList.add('fecha_comentario')
                    fecha_comentario.innerHTML = comentario.fecha_comentario
                
                    let usuario_comentario = document.createElement('span')
                    usuario_comentario.classList.add('usuario_comentario')
                    usuario_comentario.innerHTML = " " + comentario.nick_comentario + " "
                    usuario_comentario.onclick = () => {
                        location.href = "perfil.php?usuario=" + usuario_comentario.innerHTML.trim()
                    }
                
                    let texto_comentario = document.createElement('span')
                    texto_comentario.classList.add('texto_comentario')
                    texto_comentario.innerHTML = comentario.comentario
                    
                    parrafo_comentario.appendChild(fecha_comentario)
                    parrafo_comentario.appendChild(usuario_comentario)
                    parrafo_comentario.appendChild(texto_comentario)

                    if(usuario_logueado.nick == comentario.nick_comentario) {
                        texto_comentario.innerHTML = texto_comentario.innerHTML + " "
                        let eliminar_comentario = document.createElement('span')
                        eliminar_comentario.classList.add('eliminar_comentario')
                        eliminar_comentario.innerHTML = buscarLiteral(literales, 'eliminar_comentario')
                        eliminar_comentario.onclick = (e) => {
                            e.target.parentNode.remove()
                            //fetch eliminar comentario
                            let bodyContent = {
                                id: comentario.id_comentario,
                            }
                            let url = '../../back/controladores/borrarComentario.php'
                            let params = {
                                method: 'POST',
                                body: JSON.stringify(bodyContent)
                            }
                            fetch(url, params)
                                .then(req => req.json())
                                .then( datos => {
                                    if (datos !== true) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: buscarLiteral(literales, "server_error_" + datos),
                                            showClass: {
                                                popup: 'animate__animated animate__fadeInDown'
                                            },
                                            hideClass: {
                                                popup: 'animate__animated animate__fadeOutUp'
                                            }
                                        })
                                    }
                                }) 
                        }

                        parrafo_comentario.appendChild(eliminar_comentario)
                    }
                
                    contenedor_comentarios.appendChild(parrafo_comentario)
                }
            
                let contenedor_reacciones = document.createElement('div')
                contenedor_reacciones.id = "contenedor_reacciones"
            
                let caja_fuego = document.createElement('div')
                caja_fuego.id = "caja_fuego"
                if(publicacion.fuego_yo == 1) {
                    caja_fuego.classList.add("activado")
                } else {
                    caja_fuego.classList.remove("activado")
                }
                caja_fuego.onclick = function(){
                    let bodyContent = {
                        id: publicacion.id,
                        reaccion: 'fuego',
                    }
                    let url = '../../back/controladores/actualizarReaccion.php'
                    let params = {
                        method: 'POST',
                        body: JSON.stringify(bodyContent)
                    }
                    fetch(url, params)
                        .then(req => req.json())
                        .then( datos => {
                            if (datos !== true) {
                                Swal.showValidationMessage(buscarLiteral(literales, 'validation_7'))
                            }
                        }) 
                }
            
                let logo_fuego = document.createElement('img')
                logo_fuego.id = "logo_fuego"
                if(publicacion.fuego_yo == 1) {
                    logo_fuego.src = "front/img/imgHome/fuego-activado.png"
                } else {
                    logo_fuego.src = "front/img/imgHome/fuego-desactivado.png"
                }
                
            
                let num_fuego = document.createElement('p')
                num_fuego.id = "num_fuego"
                num_fuego.innerHTML = publicacion.fuegos
            
                caja_fuego.appendChild(logo_fuego)
                caja_fuego.appendChild(num_fuego)
            
                let caja_like = document.createElement('div')
                caja_like.id = "caja_like"
                if(publicacion.pulgar_yo == 1) {
                    caja_like.classList.add("activado")
                } else {
                    caja_like.classList.remove("activado")
                }
                caja_like.onclick = function(){
                    let bodyContent = {
                        id: publicacion.id,
                        reaccion: 'pulgar',
                    }
                    let url = '../../back/controladores/actualizarReaccion.php'
                    let params = {
                        method: 'POST',
                        body: JSON.stringify(bodyContent)
                    }
                    fetch(url, params)
                        .then(req => req.json())
                        .then( datos => {
                            if (datos !== true) {
                                Swal.showValidationMessage(buscarLiteral(literales, 'validation_8'))
                            }
                        })
                }
            
                let logo_like = document.createElement('img')
                logo_like.id = "logo_like"
                if(publicacion.pulgar_yo == 1) {
                    logo_like.src = "front/img/imgHome/me-gusta-activado.png"
                } else {
                    logo_like.src = "front/img/imgHome/me-gusta-desactivado.png"
                }
            
                let num_like = document.createElement('p')
                num_like.id = "num_like"
                num_like.innerHTML = publicacion.pulgares
            
                caja_like.appendChild(logo_like)
                caja_like.appendChild(num_like)
            
                let caja_dislike = document.createElement('div')
                caja_dislike.id = "caja_dislike"
                if(publicacion.dislike_yo == 1) {
                    caja_dislike.classList.add("activado")
                } else {
                    caja_dislike.classList.remove("activado")
                }
                caja_dislike.onclick = function(){
                    let bodyContent = {
                        id: publicacion.id,
                        reaccion: 'dislike',
                    }
                    let url = '../../back/controladores/actualizarReaccion.php'
                    let params = {
                        method: 'POST',
                        body: JSON.stringify(bodyContent)
                    }
                    fetch(url, params)
                        .then(req => req.json())
                        .then( datos => {
                            if (datos !== true) {
                                Swal.showValidationMessage(buscarLiteral(literales, 'validation_9'))
                            }
                        })
                }
            
                let logo_dislike = document.createElement('img')
                logo_dislike.id = "logo_dislike"
                if(publicacion.dislike_yo == 1) {
                    logo_dislike.src = "front/img/imgHome/no-me-gusta-activado.png"
                } else {
                    logo_dislike.src = "front/img/imgHome/no-me-gusta-desactivado.png"
                }
            
                let num_dislike = document.createElement('p')
                num_dislike.id = "num_dislike"
                num_dislike.innerHTML = publicacion.dislikes
            
                caja_dislike.appendChild(logo_dislike)
                caja_dislike.appendChild(num_dislike)
            
                let caja_labio = document.createElement('div')
                caja_labio.id = "caja_labio"
                if(publicacion.labios_yo == 1) {
                    caja_labio.classList.add("activado")
                } else {
                    caja_labio.classList.remove("activado")
                }
                caja_labio.onclick = function(){
                    let bodyContent = {
                        id: publicacion.id,
                        reaccion: 'labios',
                    }
                    let url = '../../back/controladores/actualizarReaccion.php'
                    let params = {
                        method: 'POST',
                        body: JSON.stringify(bodyContent)
                    }
                    fetch(url, params)
                        .then(req => req.json())
                        .then( datos => {
                            if (datos !== true) {
                                Swal.showValidationMessage(buscarLiteral(literales, 'validation_10'))
                            }
                        })
                }
            
                let logo_labio = document.createElement('img')
                logo_labio.id = "logo_labio"
                if(publicacion.labios_yo == 1) {
                    logo_labio.src = "front/img/imgHome/labios-activado.png"
                } else {
                    logo_labio.src = "front/img/imgHome/labios-desactivado.png"
                }
            
                let num_labio = document.createElement('p')
                num_labio.id = "num_labio"
                num_labio.innerHTML = publicacion.labios
            
                caja_labio.appendChild(logo_labio)
                caja_labio.appendChild(num_labio)
            
                let caja_corazon = document.createElement('div')
                caja_corazon.id = "caja_corazon"
                if(publicacion.corazon_yo == 1) {
                    caja_corazon.classList.add("activado")
                } else {
                    caja_corazon.classList.remove("activado")
                }
                caja_corazon.onclick = function(){
                    let bodyContent = {
                        id: publicacion.id,
                        reaccion: 'corazon',
                    }
                    let url = '../../back/controladores/actualizarReaccion.php'
                    let params = {
                        method: 'POST',
                        body: JSON.stringify(bodyContent)
                    }
                    fetch(url, params)
                        .then(req => req.json())
                        .then( datos => {
                        if (datos !== true) {
                            Swal.showValidationMessage(buscarLiteral(literales, 'validation_11'))
                        }
                        })
                }
            
                let logo_corazon = document.createElement('img')
                logo_corazon.id = "logo_corazon"
                if(publicacion.corazon_yo == 1) {
                    logo_corazon.src = "front/img/imgHome/corazon-activado.png"
                } else {
                    logo_corazon.src = "front/img/imgHome/corazon-desactivado.png"
                }
            
                let num_corazon = document.createElement('p')
                num_corazon.id = "num_corazon"
                num_corazon.innerHTML = publicacion.corazones
            
                caja_corazon.appendChild(logo_corazon)
                caja_corazon.appendChild(num_corazon)
            
                contenedor_reacciones.appendChild(caja_fuego)
                contenedor_reacciones.appendChild(caja_like)
                contenedor_reacciones.appendChild(caja_dislike)
                contenedor_reacciones.appendChild(caja_labio)
                contenedor_reacciones.appendChild(caja_corazon)
                
                let c_comentario_personal = document.createElement('textarea')
                c_comentario_personal.id = 'c_comentario_personal'
                c_comentario_personal.placeholder = buscarLiteral(literales, c_comentario_personal.id)
                c_comentario_personal.onkeyup = (e) => {
                    if (e.keyCode == 13 && e.shiftKey) {
                        let bodyContent = {
                            id_publicacion: publicacion.id,
                            comentario: e.target.value,
                        }
                        let url = '../../back/controladores/enviarComentario.php'
                        let params = {
                            method: 'POST',
                            body: JSON.stringify(bodyContent)
                        }
                        fetch(url, params)
                            .then(req => req.json())
                            .then( datos => { 
                                if (datos.id) {
                                    let parrafo_comentario = document.createElement('p')
                                    parrafo_comentario.classList.add('comentarios')
                                    parrafo_comentario.id = datos.id
                                
                                    let fecha_comentario = document.createElement('span')
                                    fecha_comentario.classList.add('fecha_comentario')
                                    let fecha_actual = new Date()
                                    fecha_comentario.innerHTML = ("0" + fecha_actual.getFullYear()).slice(-4) + "-" + 
                                                                ("0" + (fecha_actual.getMonth() + 1)).slice(-2) + "-" +
                                                                ("0" + fecha_actual.getDate()).slice(-2) + " " + 
                                                                ("0" + fecha_actual.getHours()).slice(-2) + ":" + 
                                                                ("0" + fecha_actual.getMinutes()).slice(-2) + ":" + 
                                                                ("0" + fecha_actual.getSeconds()).slice(-2)
                                
                                    let usuario_comentario = document.createElement('span')
                                    usuario_comentario.classList.add('usuario_comentario')
                                    usuario_comentario.innerHTML = " " + usuario_logueado.nick + " "
                                    usuario_comentario.onclick = () => {
                                        location.href = "perfil.php?usuario=" + usuario_comentario.innerHTML.trim()
                                    }
                                
                                    let texto_comentario = document.createElement('span')
                                    texto_comentario.classList.add('texto_comentario')
                                    texto_comentario.innerHTML = c_comentario_personal.value

                                    texto_comentario.innerHTML = texto_comentario.innerHTML + " "
                                    let eliminar_comentario = document.createElement('span')
                                    eliminar_comentario.classList.add('eliminar_comentario')
                                    eliminar_comentario.innerHTML = buscarLiteral(literales, 'eliminar_comentario')
                                    eliminar_comentario.onclick = (e) => {
                                        e.target.parentNode.remove()
                                        //fetch eliminar comentario
                                        let bodyContent = {
                                            id: e.target.parentNode.id,
                                        }
                                        let url = '../../back/controladores/borrarComentario.php'
                                        let params = {
                                            method: 'POST',
                                            body: JSON.stringify(bodyContent)
                                        }
                                        fetch(url, params)
                                            .then(req => req.json())
                                            .then( datos => {
                                                if (datos !== true) {
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: buscarLiteral(literales, "server_error_" + datos),
                                                        showClass: {
                                                            popup: 'animate__animated animate__fadeInDown'
                                                        },
                                                        hideClass: {
                                                            popup: 'animate__animated animate__fadeOutUp'
                                                        }
                                                    })
                                                }
                                            }) 
                                    }
                                    
                                    parrafo_comentario.appendChild(fecha_comentario)
                                    parrafo_comentario.appendChild(usuario_comentario)
                                    parrafo_comentario.appendChild(texto_comentario)
                                    parrafo_comentario.appendChild(eliminar_comentario)

                                    contenedor_comentarios.insertBefore(parrafo_comentario, contenedor_comentarios.children[0]); 
                                    e.target.value = ""
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: buscarLiteral(literales, "server_error_" + datos),
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    })
                                }
                            })
                    } 
                }
            
                c_img_click.appendChild(contenedor_comentarios)
                c_img_click.appendChild(document.createElement('hr'))
                c_img_click.appendChild(contenedor_reacciones)
                c_img_click.appendChild(document.createElement('hr'))
                c_img_click.appendChild(c_comentario_personal)
            
                main.appendChild(c_recomendaciones_img)
                main.appendChild(c_img_click)
            
                $('#caja_fuego').click(function(){
                    $(this).toggleClass('activado')
                    if ($(this).hasClass('activado')){
                        $(this).children().first().attr('src', 'front/img/imgHome/fuego-activado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())+1)
                    } else {
                        $(this).children().first().attr('src', 'front/img/imgHome/fuego-desactivado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())-1)
                    }
                })
            
                $('#caja_like').click(function(){
                    $(this).toggleClass('activado')
                    if ($(this).hasClass('activado')){
                        $(this).children().first().attr('src', 'front/img/imgHome/me-gusta-activado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())+1)
                    } else {
                        $(this).children().first().attr('src', 'front/img/imgHome/me-gusta-desactivado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())-1)
                    }
                })
            
                $('#caja_dislike').click(function(){
                    $(this).toggleClass('activado')
                    if ($(this).hasClass('activado')){
                        $(this).children().first().attr('src', 'front/img/imgHome/no-me-gusta-activado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())+1)
                    } else {
                        $(this).children().first().attr('src', 'front/img/imgHome/no-me-gusta-desactivado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())-1)
                    }
                })
            
                $('#caja_labio').click(function(){
                    $(this).toggleClass('activado')
                    if ($(this).hasClass('activado')){
                        $(this).children().first().attr('src', 'front/img/imgHome/labios-activado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())+1)
                    } else {
                        $(this).children().first().attr('src', 'front/img/imgHome/labios-desactivado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())-1)
                    }
                })
            
                $('#caja_corazon').click(function(){
                    $(this).toggleClass('activado')
                    if ($(this).hasClass('activado')){
                        $(this).children().first().attr('src', 'front/img/imgHome/corazon-activado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())+1)
                    } else {
                        $(this).children().first().attr('src', 'front/img/imgHome/corazon-desactivado.png')
                        $(this).children().last().html(parseInt($(this).children().last().html())-1)
                    }
                })
            })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: buscarLiteral(literales, "server_error_" + recomendaciones),
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
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
    cajaDirecciones.appendChild(twitter_enlace)
    cajaDirecciones.appendChild(gmail_enlace)
    cajaDirecciones.appendChild(linkedin_enlace)
    cajaDirecciones.appendChild(maps_enlace)

    footer.appendChild(p1)
    footer.appendChild(cajaDirecciones)

}