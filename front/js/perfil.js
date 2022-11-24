import { getCookie, setCookie, buscarLiteral } from "./utils.js";

window.onload = ()=>{

    var lenguaje_actual = getCookie("idioma")
    if (lenguaje_actual == null) {
        setCookie("idioma", "es", 7)
    } else {
        setCookie("idioma", lenguaje_actual, 7) //actualiza la cookie
    }

    cargarPerfil()

}

function cargarPerfil() {
    let bodyContent = {
        id_html: 'perfil',
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

    let boton_menu = document.createElement('button')
    boton_menu.id = "boton_menu"
    boton_menu.classList.add("botonIdiomas")
    boton_menu.onclick = () => {
        div_contenedor_menu.classList.toggle("ocultar")
    }

    let imagen_menu = document.createElement('img')
    imagen_menu.id = "menu"
    imagen_menu.src = "../img/imgMenu/menu.png"
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

    let div_section1 = document.createElement('div')
    div_section1.id = "section1"

    let img_perfil = document.createElement('img')
    img_perfil.id = "imgPerfil"
    img_perfil.src = "../img/imgPerfil/perfil.png"

    let div_texto_perfil = document.createElement('div')
    div_texto_perfil.id = "textoPerfil"

    let h3_nombre = document.createElement('h3')
    h3_nombre.id = "h3_nombre"
    h3_nombre.innerHTML = buscarLiteral(literales, h3_nombre.id)

    let h3_correo = document.createElement('h3')
    h3_correo.id = "h3_correo"
    h3_correo.innerHTML = buscarLiteral(literales, h3_correo.id) 

    let h3_sexo = document.createElement('h3')
    h3_sexo.id = "h3_sexo"
    h3_sexo.innerHTML = buscarLiteral(literales, h3_sexo.id) 

    let h3_rol = document.createElement('h3')
    h3_rol.id = "h3_rol"
    h3_rol.innerHTML = buscarLiteral(literales, h3_rol.id) 

    div_texto_perfil.appendChild(h3_nombre)
    div_texto_perfil.appendChild(document.createElement('br'))
    div_texto_perfil.appendChild(h3_correo)
    div_texto_perfil.appendChild(document.createElement('br'))
    div_texto_perfil.appendChild(h3_sexo)
    div_texto_perfil.appendChild(document.createElement('br'))
    div_texto_perfil.appendChild(h3_rol)
    div_texto_perfil.appendChild(document.createElement('br'))

    div_section1.appendChild(img_perfil)
    div_section1.appendChild(div_texto_perfil)

    let div_btn_img_vid = document.createElement('div')
    div_btn_img_vid.id = "btnImgVid"

    let boton_imagenes = document.createElement('button')
    boton_imagenes.id = "btnImagenes"

    let h2_boton_imagenes = document.createElement('h2')
    h2_boton_imagenes.id = "h2_boton_imagenes"
    h2_boton_imagenes.innerHTML = buscarLiteral(literales, h2_boton_imagenes.id)
    h2_boton_imagenes.onmouseover = () =>{
        div_dis_img.classList.remove("ocultar")
        h2_boton_imagenes.classList.toggle("btnActivo")
        if (!div_dis_vid.classList.contains("ocultar")){
            div_dis_vid.classList.add("ocultar")
        }
        if (h2_boton_videos.classList.contains("btnActivo")){
            h2_boton_videos.classList.remove("btnActivo")
        }
    }

    boton_imagenes.appendChild(h2_boton_imagenes)

    let boton_videos = document.createElement('button')
    boton_videos.id = "btnVideos"

    let h2_boton_videos = document.createElement('h2')
    h2_boton_videos.id = "h2_boton_videos"
    h2_boton_videos.innerHTML = buscarLiteral(literales, h2_boton_videos.id)
    h2_boton_videos.onmouseover = () =>{
        div_dis_vid.classList.remove("ocultar")
        h2_boton_videos.classList.toggle("btnActivo")
        if (!div_dis_img.classList.contains("ocultar")){
            div_dis_img.classList.add("ocultar")
        }
        if (h2_boton_imagenes.classList.contains("btnActivo")){
            h2_boton_imagenes.classList.remove("btnActivo")
        }
    }

    boton_videos.appendChild(h2_boton_videos)

    div_btn_img_vid.appendChild(boton_imagenes)
    div_btn_img_vid.appendChild(boton_videos)

    let div_dis_img = document.createElement('div')
    div_dis_img.id = "disImg"
    div_dis_img.classList.add("ocultar")

    let div_caj_imagenes = document.createElement('div')
    div_caj_imagenes.id = "cajImagenes"

    let imagen1 = document.createElement('img')
    imagen1.src = "../img/imgImagenes/img1.png"
    imagen1.classList.add("imagenes")

    let imagen2 = document.createElement('img')
    imagen2.src = "../img/imgImagenes/img2.png"
    imagen2.classList.add("imagenes")
    
    let imagen3 = document.createElement('img')
    imagen3.src = "../img/imgImagenes/img3.png"
    imagen3.classList.add("imagenes")

    let imagen4 = document.createElement('img')
    imagen4.src = "../img/imgImagenes/img4.png"
    imagen4.classList.add("imagenes")

    let imagen5 = document.createElement('img')
    imagen5.src = "../img/imgImagenes/img5.png"
    imagen5.classList.add("imagenes")

    let imagen6 = document.createElement('img')
    imagen6.src = "../img/imgImagenes/img6.png"
    imagen6.classList.add("imagenes")

    let imagen7 = document.createElement('img')
    imagen7.src = "../img/imgImagenes/img7.png"
    imagen7.classList.add("imagenes")

    let imagen8 = document.createElement('img')
    imagen8.src = "../img/imgImagenes/img8.png"
    imagen8.classList.add("imagenes")

    div_caj_imagenes.appendChild(imagen1)
    div_caj_imagenes.appendChild(imagen2)
    div_caj_imagenes.appendChild(imagen3)
    div_caj_imagenes.appendChild(imagen4)
    div_caj_imagenes.appendChild(imagen5)
    div_caj_imagenes.appendChild(imagen6)
    div_caj_imagenes.appendChild(imagen7)
    div_caj_imagenes.appendChild(imagen8)

    div_dis_img.appendChild(div_caj_imagenes)

    let div_dis_vid = document.createElement('div')
    div_dis_vid.id = "disVid"
    div_dis_vid.classList.add("ocultar")

    let div_caj_videos = document.createElement('div')
    div_caj_videos.id = "cajVideos"

    let video1 = document.createElement('img')
    video1.src = "../img/imgVideos/vid1.png"
    video1.classList.add("videos")

    let video2 = document.createElement('img')
    video2.src = "../img/imgVideos/vid2.png"
    video2.classList.add("videos")
    
    let video3 = document.createElement('img')
    video3.src = "../img/imgVideos/vid3.png"
    video3.classList.add("videos")

    let video4 = document.createElement('img')
    video4.src = "../img/imgVideos/vid4.png"
    video4.classList.add("videos")

    let video5 = document.createElement('img')
    video5.src = "../img/imgVideos/vid5.png"
    video5.classList.add("videos")

    let video6 = document.createElement('img')
    video6.src = "../img/imgVideos/vid6.png"
    video6.classList.add("videos")

    let video7 = document.createElement('img')
    video7.src = "../img/imgVideos/vid7.png"
    video7.classList.add("videos")

    let video8 = document.createElement('img')
    video8.src = "../img/imgVideos/vid8.png"
    video8.classList.add("videos")

    div_caj_videos.appendChild(video1)
    div_caj_videos.appendChild(video2)
    div_caj_videos.appendChild(video3)
    div_caj_videos.appendChild(video4)
    div_caj_videos.appendChild(video5)
    div_caj_videos.appendChild(video6)
    div_caj_videos.appendChild(video7)
    div_caj_videos.appendChild(video8)

    div_dis_vid.appendChild(div_caj_videos)

    main.appendChild(div_section1)
    main.appendChild(document.createElement('hr'))
    main.appendChild(div_btn_img_vid)
    main.appendChild(div_dis_img)
    main.appendChild(div_dis_vid)
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