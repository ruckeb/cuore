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

function cargarHome() {
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
            cargarCabecera(literales)
            cargarMain(literales)
            cargarFooter(literales)
        })
}

function cargarCabecera(literales) {
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

    let p_menu1 = document.createElement('p')
    p_menu1.id = "p_menu1"
    p_menu1.innerHTML = buscarLiteral(literales, p_menu1.id) //Caja1

    boton_menu1.appendChild(p_menu1)

    let boton_menu2 = document.createElement('button')
    boton_menu2.id = "boton_menu2"
    boton_menu2.classList.add("btnMenu")

    let p_menu2 = document.createElement('p')
    p_menu2.id = "p_menu2"
    p_menu2.innerHTML = buscarLiteral(literales, p_menu2.id) //Caja2

    boton_menu2.appendChild(p_menu2)

    let boton_menu3 = document.createElement('button')
    boton_menu3.id = "boton_menu3"
    boton_menu3.classList.add("btnMenu")

    let p_menu3 = document.createElement('p')
    p_menu3.id = "p_menu3"
    p_menu3.innerHTML = buscarLiteral(literales, p_menu3.id) //Caja3

    boton_menu3.appendChild(p_menu3)

    let boton_menu4 = document.createElement('button')
    boton_menu4.id = "boton_menu4"
    boton_menu4.classList.add("btnMenu")

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

function cargarMain(literales) {
    let main = document.body.children[1]

    let url = '../../back/controladores/getRecomendaciones.php'
    let params = {
        method: 'GET',
    }
    fetch(url, params)
        .then(req => req.json())
        .then( recomendaciones => {
            console.log(recomendaciones)
            let c_recomendaciones_img = document.createElement('div')
            c_recomendaciones_img.id = "c_recomendaciones_img"
        
            let imagen_flecha_izq = document.createElement('img')
            imagen_flecha_izq.id = "flecha_izq"
            imagen_flecha_izq.src = "front/img/imgHome/flecha-izq-negro-rosa.png"
        
            let img_recomendacion = document.createElement('img')
            img_recomendacion.id = "img_recomendacion"
            img_recomendacion.src = "front/img/imgPerfil/perfil.png"
        
            let imagen_flecha_der = document.createElement('img')
            imagen_flecha_der.id = "flecha_der"
            imagen_flecha_der.src = "front/img/imgHome/flecha-der-negro-rosa.png"
        
            let contenedor_datos_imagen = document.createElement('div')
            contenedor_datos_imagen.id = "contenedor_datos_imagen"
        
            let usuario_imagen = document.createElement('p')
            usuario_imagen.id = "usuario_imagen"
            usuario_imagen.innerHTML = "Denche11"
        
            let comentario_usuario_imagen = document.createElement('div')
            comentario_usuario_imagen.id = "comentario_usuario_imagen"
            comentario_usuario_imagen.innerHTML = "Hoy por la mañana recien levantadito amor!"
        
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
        
            let parrafo_comentario = document.createElement('p')
            parrafo_comentario.classList.add('comentarios')
        
            let fecha_comentario = document.createElement('span')
            fecha_comentario.classList.add('fecha_comentario')
            fecha_comentario.innerHTML = "13/02/2001 "
            // fecha_comentario.innerHTML = 
        
            let usuario_comentario = document.createElement('span')
            usuario_comentario.classList.add('usuario_comentario')
            usuario_comentario.innerHTML = " Denche11: "
        
            let texto_comentario = document.createElement('span')
            texto_comentario.classList.add('texto_comentario')
            texto_comentario.innerHTML = " Me comento a mi mismo porque estoy tremendo"
            
            parrafo_comentario.appendChild(fecha_comentario)
            parrafo_comentario.appendChild(usuario_comentario)
            parrafo_comentario.appendChild(texto_comentario)
        
            contenedor_comentarios.appendChild(parrafo_comentario)
        
            let contenedor_reacciones = document.createElement('div')
            contenedor_reacciones.id = "contenedor_reacciones"
        
            let caja_fuego = document.createElement('div')
            caja_fuego.id = "caja_fuego"
            caja_fuego.onclick = function(){
                
            }
        
            let logo_fuego = document.createElement('img')
            logo_fuego.id = "logo_fuego"
            logo_fuego.src = "front/img/imgHome/fuego-desactivado.png"
        
            let num_fuego = document.createElement('p')
            num_fuego.id = "num_fuego"
            num_fuego.innerHTML = "0"
        
            caja_fuego.appendChild(logo_fuego)
            caja_fuego.appendChild(num_fuego)
        
            let caja_like = document.createElement('div')
            caja_like.id = "caja_like"
            caja_like.onclick = function(){
                
            }
        
            let logo_like = document.createElement('img')
            logo_like.id = "logo_like"
            logo_like.src = "front/img/imgHome/me-gusta-desactivado.png"
        
            let num_like = document.createElement('p')
            num_like.id = "num_like"
            num_like.innerHTML = "0"
        
            caja_like.appendChild(logo_like)
            caja_like.appendChild(num_like)
        
            let caja_dislike = document.createElement('div')
            caja_dislike.id = "caja_dislike"
            caja_dislike.onclick = function(){
                
            }
        
            let logo_dislike = document.createElement('img')
            logo_dislike.id = "logo_dislike"
            logo_dislike.src = "front/img/imgHome/no-me-gusta-desactivado.png"
        
            let num_dislike = document.createElement('p')
            num_dislike.id = "num_dislike"
            num_dislike.innerHTML = "0"
        
            caja_dislike.appendChild(logo_dislike)
            caja_dislike.appendChild(num_dislike)
        
           let caja_labio = document.createElement('div')
            caja_labio.id = "caja_labio"
            caja_labio.onclick = function(){
                
            }
        
            let logo_labio = document.createElement('img')
            logo_labio.id = "logo_labio"
            logo_labio.src = "front/img/imgHome/labios-desactivado.png"
        
            let num_labio = document.createElement('p')
            num_labio.id = "num_labio"
            num_labio.innerHTML = "0"
        
            caja_labio.appendChild(logo_labio)
            caja_labio.appendChild(num_labio)
        
            let caja_corazon = document.createElement('div')
            caja_corazon.id = "caja_corazon"
            caja_corazon.onclick = function(){
                
            }
        
            let logo_corazon = document.createElement('img')
            logo_corazon.id = "logo_corazon"
            logo_corazon.src = "front/img/imgHome/corazon-desactivado.png"
        
            let num_corazon = document.createElement('p')
            num_corazon.id = "num_corazon"
            num_corazon.innerHTML = "0"
        
            caja_corazon.appendChild(logo_corazon)
            caja_corazon.appendChild(num_corazon)
        
            contenedor_reacciones.appendChild(caja_fuego)
            contenedor_reacciones.appendChild(caja_like)
            contenedor_reacciones.appendChild(caja_dislike)
            contenedor_reacciones.appendChild(caja_labio)
            contenedor_reacciones.appendChild(caja_corazon)
            
            let c_comentario_personal = document.createElement('textarea')
            c_comentario_personal.id = 'c_comentario_personal'
            c_comentario_personal.placeholder = 'comentario...'
        
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