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

    let c_recomendaciones_img = document.createElement('div')
    c_recomendaciones_img.id = "c_recomendaciones_img"

    // let imagenes no se el como meter las indefinidas, al hacer click c_img_click display= block
    // meter dos botones uno al principio y otro al final que hagan como para pasar adelante y atras

    let c_img_click = document.createElement('div')
    c_img_click.id = "c_img_click"
    c_img_click.style.display = 'block'
   
    let img_escogida = document.createElement('img')
    img_escogida.id = "img_escogida"
    img_escogida.innerHTML = buscarLiteral(literales, img_escogida.id)

    let contenedor_general_comentarios = document.createElement('div')
    contenedor_general_comentarios.id = "contenedor_general_comentarios"

    let contenedor_comentarios = document.createElement('div')
    contenedor_comentarios.id = "contenedor_comentarios"
    
    let contenedor_reacciones = document.createElement('div')
    contenedor_reacciones.id = "contenedor_reacciones"
    
    let c_comentario_personal = document.createElement('textarea')
    c_comentario_personal.id = 'c_comentario_personal'
    c_comentario_personal.placeholder = 'comentario...'

    contenedor_general_comentarios.appendChild(contenedor_comentarios)
    contenedor_general_comentarios.appendChild(document.createElement('hr'))
    contenedor_general_comentarios.appendChild(contenedor_reacciones)
    contenedor_general_comentarios.appendChild(document.createElement('hr'))
    contenedor_general_comentarios.appendChild(c_comentario_personal)

    c_img_click.appendChild(img_escogida)
    c_img_click.appendChild(contenedor_general_comentarios)

    main.appendChild(c_recomendaciones_img)
    main.appendChild(c_img_click)
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