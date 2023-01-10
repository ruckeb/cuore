import { getCookie, setCookie, buscarLiteral } from "./utils.js";
var literales
var usuario_logueado

window.onload = ()=>{

    function cargarLiterales() {
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
                    if (usuario.superadmin==1) {
                        Swal.fire({
                            text: buscarLiteral(literales, 'restringido_no_superadmin'),
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
                            location.href = 'superadmin.php'
                        })
                    } else {
                        usuario_logueado = usuario
                        cargarPerfil()
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

function cargarPerfil() {
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
        location.href = "home.php"
    }

    let boton_premium = document.createElement('button')
    boton_premium.id = "boton_premium"
    boton_premium.classList.add("boton_cabecera")
    boton_premium.innerHTML = buscarLiteral(literales, boton_premium.id)
    boton_premium.onclick = e => {
        e.preventDefault()
        Swal.fire({
            showDenyButton: true,
            confirmButtonText: buscarLiteral(literales, "confirmar_alerta"),
            denyButtonText: buscarLiteral(literales, "cancelar_alerta"),
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            html:   "<form>"+
                        "<div class = 'caja_premium'>"+
                        "<h5 id = 'titulo_premium'>"+
                        buscarLiteral(literales, 'titulo_premium')+ "</h5>"+  
                        "</div>"+ 
                        "<div class = 'caja_premium'>"+
                            "<label id = 'titulo_nombre_completo' for = 'text_nombre_completo'>"+
                            buscarLiteral(literales, 'titulo_nombre_completo')+ "</label>"+
                            "<input id = 'text_nombre_completo' type = 'text' name = 'text_nombre_completo' autocomplete = 'off'>"+      
                        "</div>"+ 
                        "<div class = 'caja_premium'>"+
                            "<label id = 'titulo_isbn' for = 'text_isbn'>"+
                            buscarLiteral(literales, 'titulo_isbn')+ "</label>"+
                            "<input id = 'text_isbn' type = 'text' name = 'text_isbn' autocomplete = 'off'>"+      
                        "</div>"+ 
                        "<div class = 'caja_premium'>"+
                            "<label id = 'titulo_caducidad' for = 'texto_caducidad'>"+
                            buscarLiteral(literales, 'titulo_caducidad')+ "</label>"+
                                "<div class= 'grupo-select'>"+
                                    "<select name='mes' id='selectMes'>"+
                                        "<option value=12>12</option>"+
                                        "<option value=11>11</option>"+
                                        "<option value=10>10</option>"+
                                        "<option value=9>09</option>"+
                                        "<option value=8>08</option>"+
                                        "<option value=7>07</option>"+
                                        "<option value=6>06</option>"+
                                        "<option value=5>05</option>"+
                                        "<option value=4>04</option>"+
                                        "<option value=3>03</option>"+
                                        "<option value=2>02</option>"+
                                        "<option value=1 selected>01</option>"+
                                    "</select>"+
                                    "<i class='fas fa-angle-down'></i>"+
                                "</div>"+"<span>/</span>"+
                                "<div class='grupo-select'>"+
                                    "<select name='year' id='selectYear'>"+
                                        "<option value=40>40</option>"+
                                        "<option value=39>39</option>"+
                                        "<option value=38>38</option>"+
                                        "<option value=37>37</option>"+
                                        "<option value=36>36</option>"+
                                        "<option value=35>35</option>"+
                                        "<option value=34>34</option>"+
                                        "<option value=33>33</option>"+
                                        "<option value=32>32</option>"+
                                        "<option value=31>31</option>"+
                                        "<option value=30>30</option>"+
                                        "<option value=29>29</option>"+
                                        "<option value=28>28</option>"+
                                        "<option value=27>27</option>"+
                                        "<option value=26>26</option>"+
                                        "<option value=25>25</option>"+
                                        "<option value=24>24</option>"+
                                        "<option value=23 selected>23</option>"+
                                    "</select>"+
                                "	<i class='fas fa-angle-down'></i>"+
                                "</div>"+
                            "<label id = 'titulo_cvv' for = 'texto_cvv'>"+
                            buscarLiteral(literales, 'titulo_cvv')+ "</label>"+
                            "<input id = 'texto_cvv' type = 'password' name = 'texto_cvv' autocomplete = 'off'>"+
                        "</div>"+
                    "</form>",
            preConfirm: () => {
                function fValidarTarjeta(isbn){
                    let VISA = /^4[0-9]{12}(?:[0-9]{3})?$/;
                    let MASTERCARD = /^5[1-5][0-9]{14}$/;
                    let AMEX = /^3[47][0-9]{13}$/;
                    let CABAL = /^(6042|6043|6044|6045|6046|5896){4}[0-9]{12}$/;
                    let NARANJA = /^(589562|402917|402918|527571|527572|0377798|0377799)[0-9]*$/;
                    let tipo_tarjeta = false
                    // Accept only digits, dashes or spaces
                    if (/[^0-9-\s]+/.test(isbn)) return false;
                    isbn = isbn.replace(/\D/g, "");
                    if(luhn(isbn)){
                        if(isbn.match(VISA)){
                            tipo_tarjeta = "VISA"
                        } else if(isbn.match(MASTERCARD)){
                            tipo_tarjeta = "MASTERCARD"
                        } else if(isbn.match(NARANJA)){
                            tipo_tarjeta = "NARANJA"
                        }else if(isbn.match(CABAL)){
                            tipo_tarjeta = "CABAL"
                        } else if(isbn.match(AMEX)){
                            tipo_tarjeta = "AMEX"
                        } 
                        return tipo_tarjeta
                    } else {
                        return false
                    }
                }
                function luhn(isbn) {
                    let nCheck = 0, bEven = false;
                    for (var n = isbn.length - 1; n >= 0; n--) {
                        var cDigit = isbn.charAt(n),
                        nDigit = parseInt(cDigit, 10);
                        if (bEven && (nDigit *= 2) > 9) nDigit -= 9; nCheck +=  nDigit; bEven = !bEven;
                    }
                    return (nCheck % 10) == 0;
                }
                function existeFecha(mes, anyo){
                    var day = 1;
                    var month = mes;
                    var year = anyo;
                    var date = new Date(year, month, day);
                    if((day-0)>(date.getDate()-0)){
                          return false;
                    }
                    return true;
              }
                const text_nombre_completo = Swal.getPopup().querySelector('#text_nombre_completo').value
                const text_isbn = Swal.getPopup().querySelector('#text_isbn').value
                const mes = Swal.getPopup().querySelector('#selectMes').value
                const anyo = Swal.getPopup().querySelector('#selectYear').value
                const texto_cvv = Swal.getPopup().querySelector('#texto_cvv').value
                if (!text_nombre_completo) {
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_7'))
                } else if (!text_isbn) {
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_8'))
                } else if (!mes || !anyo) {
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_9'))
                } else if (!texto_cvv) {
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_10'))
                } else if(!fValidarTarjeta(text_isbn)){
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_11'))
                } else if(!existeFecha(mes, anyo)){
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_12'))
                } else if(!/^[0-9]{3,4}$/.test(texto_cvv)){
                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_13'))
                } else {
                    return {
                        text_nombre_completo: text_nombre_completo,
                        text_isbn: text_isbn,
                        mes: mes,
                        anyo: anyo,
                        texto_cvv: texto_cvv
                    }
                }
            }
        })
            .then( (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: buscarLiteral(literales, 'realizando_pago'),
                        icon: "info",
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
                        .then( () => {
                            let url = '../../back/controladores/enviarPago.php'
                            let params = {
                                method: 'POST',
                            }
                            fetch(url, params)
                                .then(req => req.json())
                                .then( respuesta => {
                                    if (respuesta === true) {
                                        Swal.fire({
                                            text: buscarLiteral(literales, 'pago_realizado_correctamente'),
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
                                        }).then(()=>location.reload())
                                    } else {
                                        if (respuesta == 999) {
                                            Swal.fire({
                                                text: buscarLiteral(literales, 'server_error_' + respuesta),
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
                                                text: buscarLiteral(literales, "server_error_" + respuesta),
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
                            })
                }
                
            })
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
        location.href = 'chatPrivado.php' 
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
        location.href = 'match.php' 
    }

    let p_menu2 = document.createElement('p')
    p_menu2.id = "p_menu2"
    p_menu2.innerHTML = buscarLiteral(literales, p_menu2.id) //Caja2

    boton_menu2.appendChild(p_menu2)

    let boton_menu4 = document.createElement('button')
    boton_menu4.id = "boton_menu4"
    boton_menu4.classList.add("btnMenu")
    boton_menu4.onclick = (e) => {
        e.preventDefault()
        location.href = 'back/controladores/cerrarSesion.php' 
    }

    let p_menu4 = document.createElement('p')
    p_menu4.id = "p_menu4"
    p_menu4.innerHTML = buscarLiteral(literales, p_menu4.id) //Caja4

    boton_menu4.appendChild(p_menu4)   

    if (usuario_logueado.premium == 1) {
        div_tabla_menu.appendChild(boton_menu1)
    }
    div_tabla_menu.appendChild(boton_menu2)
    div_tabla_menu.appendChild(boton_menu4)

    div_contenedor_menu.appendChild(div_tabla_menu)

    if (usuario_logueado.premium == 0) {
        div_botones_login.appendChild(boton_premium)
    }
    div_botones_login.appendChild(boton_espana)
    div_botones_login.appendChild(boton_reino_unido)
    div_botones_login.appendChild(boton_francia)
    div_botones_login.appendChild(boton_alemania)
    div_botones_login.appendChild(boton_menu)

    header.appendChild(imagen_logo_cuore)
    header.appendChild(div_botones_login)
    header.appendChild(div_contenedor_menu)

}

function cargarMain() {
    let url_fetch 
    let url_actual = new URL(location.href);
    let nick = url_actual.searchParams.get("usuario");
    let mi_perfil = false
    if (nick!=null) {
        if (nick == usuario_logueado.nick) {
            url_fetch = '../../back/controladores/getPerfil.php'
            mi_perfil = true
        }else{
            url_fetch = '../../back/controladores/getPerfil.php?usuario='+nick
        }
    } else {
        url_fetch = '../../back/controladores/getPerfil.php'
        mi_perfil = true
    }

    let params = {
        method: 'GET',
    }
    fetch(url_fetch, params)
        .then(req => req.json())
        .then( usuario => {

            if (usuario.nick) {
                let main = document.body.children[1]

                let div_section1 = document.createElement('div')
                div_section1.id = "section1"

                let caja_perfil_imagen = document.createElement('div')
                caja_perfil_imagen.id = "caja_perfil_imagen"

                let img_label = document.createElement('label')
                img_label.id = "imgLabel"
                img_label.htmlFor = "imgInput"

                let img_perfil = document.createElement('img')
                img_perfil.id = "imgPerfil"
                img_perfil.alt = buscarLiteral(literales, img_perfil.id)
                img_perfil.src = usuario.imagen

                img_label.appendChild(img_perfil)

                if (mi_perfil === true) {
                    let img_input = document.createElement('input')
                    img_input.id = "imgInput"
                    img_input.type = "file"
                    img_input.name = "imgInput" 
                    img_input.accept = ".PNG,.JPG,.JPEG"
                    img_input.required = true
                    img_input.onchange  = (e) => {
                        let data = new FormData()
                        data.append('imagen', img_input.files[0])
                        let url = '../../back/controladores/actualizarImagenPerfil.php'
                        let params = {
                            method: 'POST',
                            body: data
                        }
                        fetch(url, params)
                        .then(req => req.json())
                        .then( datos => {
                            if (typeof datos == "number") {
                                if (datos == 999) {
                                    Swal.fire({
                                        text: buscarLiteral(literales, 'server_error_' + datos),
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
                                        text: buscarLiteral(literales, "server_error_" + datos),
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    })
                                }
                            } else {
                                console.log(e.target)
                                e.target.nextSibling.children[0].src = datos
                            }
                            })
                    }

                    caja_perfil_imagen.appendChild(img_input)
                }
                
                caja_perfil_imagen.appendChild(img_label)

                let usuario_nick = document.createElement('h1')
                usuario_nick.id = "usuario_nick" 
                usuario_nick.innerHTML = usuario.nick

                caja_perfil_imagen.appendChild(usuario_nick)

                let caja_perfil = document.createElement('div')
                caja_perfil.id = "caja_perfil"

                let caja_nombre = document.createElement('div')
                caja_nombre.id = "caja_nombre"

                let titulo_nombre = document.createElement('label')
                titulo_nombre.id = "titulo_nombre"
                titulo_nombre.innerHTML = buscarLiteral(literales, titulo_nombre.id)

                var texto_nombre = document.createElement('p')
                texto_nombre.id = "texto_nombre"
                texto_nombre.innerHTML = usuario.nombre

                caja_nombre.appendChild(titulo_nombre)
                caja_nombre.appendChild(texto_nombre)

                let caja_correo = document.createElement('div')
                caja_correo.id = "caja_correo"

                let titulo_correo = document.createElement('label')
                titulo_correo.id = "titulo_correo"
                titulo_correo.innerHTML = buscarLiteral(literales, titulo_correo.id)

                let texto_correo = document.createElement('p')
                texto_correo.id = "texto_correo"
                texto_correo.innerHTML = usuario.email

                caja_correo.appendChild(titulo_correo)
                caja_correo.appendChild(texto_correo)

                let caja_sexo = document.createElement('div')
                caja_sexo.id = "caja_sexo"

                let titulo_sexo = document.createElement('label')
                titulo_sexo.id = "titulo_sexo"
                titulo_sexo.innerHTML = buscarLiteral(literales, titulo_sexo.id)

                let texto_sexo = document.createElement('p')
                texto_sexo.id = "texto_sexo"
                if(usuario.sexo == 1){
                    texto_sexo.innerHTML = buscarLiteral(literales, texto_sexo.id + "_hombre")
                }else if (usuario.sexo == 2){
                    texto_sexo.innerHTML = buscarLiteral(literales, texto_sexo.id + "_mujer")
                }else if (usuario.sexo == 3){
                    texto_sexo.innerHTML = buscarLiteral(literales, texto_sexo.id + "_intersexo_hombre")
                }else if (usuario.sexo == 4){
                    texto_sexo.innerHTML = buscarLiteral(literales, texto_sexo.id + "_intersexo_mujer")
                }else{
                    texto_sexo.innerHTML = buscarLiteral(literales, texto_sexo.id + "_otros")
                }

                caja_sexo.appendChild(titulo_sexo)
                caja_sexo.appendChild(texto_sexo)

                let caja_rol = document.createElement('div')
                caja_rol.id = "caja_rol"

                let titulo_rol = document.createElement('label')
                titulo_rol.id = "titulo_rol"
                titulo_rol.innerHTML = buscarLiteral(literales, titulo_rol.id)

                let texto_rol = document.createElement('p')
                texto_rol.id = "texto_rol"
                if(usuario.perfil_busqueda == 1){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_hombre")
                }else if ( usuario.perfil_busqueda == 2){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_mujer")
                }else if ( usuario.perfil_busqueda == 3){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_intersexo_hombre")
                }else if ( usuario.perfil_busqueda == 4){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_intersexo_mujer")
                }else if ( usuario.perfil_busqueda == 5){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_hombre_mujer")
                }else if ( usuario.perfil_busqueda == 6){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_hombre_intersexo_hombre")
                }else if ( usuario.perfil_busqueda == 7){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_hombre_intersexo_mujer")
                }else if ( usuario.perfil_busqueda == 8){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_mujer_intersexo_hombre")
                }else if ( usuario.perfil_busqueda == 9){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_mujer_intersexo_mujer")
                }else if ( usuario.perfil_busqueda == 10){
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_intersexo_mujer_intersexo_hombre")
                }else{
                    texto_rol.innerHTML = buscarLiteral(literales, texto_rol.id + "_todos")
                }

                caja_rol.appendChild(titulo_rol)
                caja_rol.appendChild(texto_rol)

                caja_perfil.appendChild(caja_nombre)
                caja_perfil.appendChild(document.createElement('br'))
                caja_perfil.appendChild(caja_correo)
                caja_perfil.appendChild(document.createElement('br'))
                caja_perfil.appendChild(caja_sexo)
                caja_perfil.appendChild(document.createElement('br'))
                caja_perfil.appendChild(caja_rol)
                caja_perfil.appendChild(document.createElement('br'))

                let caja_publi_edicion = document.createElement('div')
                caja_publi_edicion.id = "caja_publi_edicion"

                let caja_publicidad = document.createElement('div')
                caja_publicidad.id = 'caja_publicidad'
                if (mi_perfil!==true) {
                    caja_publicidad.classList.add("center")
                }
                
                let publicidad = document.createElement('a')
                publicidad.id = 'publicidad'
                publicidad.target = 'video_publi'
                
                let video_publi = document.createElement('video')
                video_publi.id = 'video_publi'
                video_publi.autoplay = true
                video_publi.muted = true
                video_publi.disablePictureInPicture = true
                video_publi.loop = true
                video_publi.innerHTML = buscarLiteral(literales, video_publi.id) // tu navegador no soporta el video

                let random = Math.ceil(Math.random() * 5);
                let source_publi = document.createElement('source')
                source_publi.src = "../back/uploads/publi/" + random + "publi.mp4"
                source_publi.type = 'video/mp4'

                switch (random) {
                    case 1:
                        publicidad.href ='https://www.garciabaquero.com/'
                        break;
                    case 2:
                        publicidad.href ='https://www.dior.com/es_es'
                        break;
                    case 3:
                        publicidad.href ='https://www.lancome.es/'
                        break;
                    case 4:
                        publicidad.href ='https://www.pacorabanne.com/es/es/fragrance/homepageFragrance?utm_source=adwords&utm_medium=paid_search_brand&utm_content=conversion&utm_bu=fragrance&utm_mkbr=brd_esp&utm_campaign=PR_ESP_Brand_SPA_ALL_Global_CONS&utm_term=paco%20rabanne&utm_clicktype=main_ad&gclsrc=aw.ds&gclid=CjwKCAiA76-dBhByEiwAA0_s9S8Nf3XYA08IRKXbMeUAZChKVOfQRkLE8w9xK_xqijkpfR2qNovN2BoCqaIQAvD_BwE'
                        break;
                    default:
                        publicidad.href ='https://www.nivea.com/'
                        break;
                } 
                switch (random) {
                    case 1:
                        publicidad.href ='https://www.garciabaquero.com/'
                        break;
                    case 2:
                        publicidad.href ='https://www.dior.com/es_es'
                        break;
                    case 3:
                        publicidad.href ='https://www.lancome.es/'
                        break;
                    case 4:
                        publicidad.href ='https://www.pacorabanne.com/es/es/fragrance/homepageFragrance?utm_source=adwords&utm_medium=paid_search_brand&utm_content=conversion&utm_bu=fragrance&utm_mkbr=brd_esp&utm_campaign=PR_ESP_Brand_SPA_ALL_Global_CONS&utm_term=paco%20rabanne&utm_clicktype=main_ad&gclsrc=aw.ds&gclid=CjwKCAiA76-dBhByEiwAA0_s9S8Nf3XYA08IRKXbMeUAZChKVOfQRkLE8w9xK_xqijkpfR2qNovN2BoCqaIQAvD_BwE'
                        break;
                    default:
                        publicidad.href ='https://www.nivea.com/'
                        break;
                } 

                video_publi.appendChild(source_publi)
                publicidad.appendChild(video_publi)
                caja_publicidad.appendChild(publicidad)
                caja_publi_edicion.appendChild(caja_publicidad)

                if (mi_perfil===true) {

                    let caja_botones_edicion = document.createElement('div')
                    caja_botones_edicion.id = "caja_botones_edicion"


                    let boton_cambiar_contra = document.createElement('button')
                    boton_cambiar_contra.id = "boton_cambiar_contra"
                    boton_cambiar_contra.classList.add("botones_seccion1")
                    boton_cambiar_contra.innerHTML = buscarLiteral(literales, boton_cambiar_contra.id)
                    boton_cambiar_contra.onclick = e => {
                        e.preventDefault()
                    
                        Swal.fire({
                            showDenyButton: true,
                            confirmButtonText: buscarLiteral(literales, "confirmar_alerta"),
                            denyButtonText: buscarLiteral(literales, "cancelar_alerta"),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                
                            html:  "<form>"+
                                        "<div class = 'padre_de_todos'>"+
                                            "<label id = 'titulo_clave_antigua' for = 'clave_antigua'>"+
                                            buscarLiteral(literales, 'titulo_clave_antigua')+ "</label>"+
                                            "<div class = 'caj_ojo'>"+
                                                "<input id = 'clave_antigua' type = 'password' name = 'clave_antigua'>"+   
                                                "<div class ='ojo_contrasena' onclick='mostrarContraseña(this)'>👁</div>"+ 
                                            "</div>"+  
                                        "</div>"+ 
                                        "<div class = 'padre_de_todos'>"+
                                            "<label id = 'titulo_clave_nueva' for = 'clave_nueva'>"+
                                            buscarLiteral(literales, 'titulo_clave_nueva')+ "</label>"+
                                            "<div class = 'caj_ojo'>"+
                                                "<input id = 'clave_nueva' type = 'password' name = 'clave_nueva'>"+
                                                "<div class ='ojo_contrasena' onclick='mostrarContraseña(this)'>👁</div>"+ 
                                            "</div>"+
                                        "</div>"+
                                        "<div class = 'padre_de_todos' >"+
                                            "<label id = 'titulo_clave_nueva_conf' for = 'clave_nueva_confir'>"+
                                            buscarLiteral(literales, 'titulo_clave_nueva_conf')+ "</label>"+
                                            "<div class = 'caj_ojo'>"+
                                                "<input id = 'clave_nueva_confir' type = 'password' name = 'clave_nueva_confir'>"+
                                                "<div class ='ojo_contrasena' onclick='mostrarContraseña(this)'>👁</div>"+ 
                                            "</div>"+
                                        "</div>"+
                                    "</form>",

                            preConfirm: () => {
                                const clave_antigua = Swal.getPopup().querySelector('#clave_antigua').value
                                const clave_nueva = Swal.getPopup().querySelector('#clave_nueva').value
                                const clave_nueva_confir = Swal.getPopup().querySelector('#clave_nueva_confir').value
                                if (!clave_antigua) {
                                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_1'))
                                } else if (!clave_nueva) {
                                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_2'))
                                } else if (!clave_nueva_confir) {
                                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_3'))
                                } else if (clave_nueva != clave_nueva_confir) {
                                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_4'))
                                } else if (!new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$").test(clave_nueva)) {
                                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_5'))
                                } else {
                                    return {
                                        clave_antigua: clave_antigua,
                                        clave_nueva: clave_nueva,
                                        clave_nueva_confir: clave_nueva_confir
                                    }
                                }
                            }
                        })
                            .then( response => {
                                if (response.isConfirmed) {
                                    let url = '../../back/controladores/cambiarContrasena.php'
                                    let params = {
                                        method: 'POST',
                                        body: JSON.stringify(response.value)
                                    }
                                    fetch(url, params)
                                        .then(req => req.json())
                                        .then( respuesta => {
                                            if (respuesta === true) {
                                                Swal.fire({
                                                    text: buscarLiteral(literales, 'contrasena_actualziada_correctamente'),
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
                                                if (respuesta == 999) {
                                                    Swal.fire({
                                                        text: buscarLiteral(literales, 'server_error_' + respuesta),
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
                                                        text: buscarLiteral(literales, "server_error_" + respuesta),
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

                    let boton_guardar = document.createElement('button')
                    boton_guardar.id = "boton_guardar"
                    boton_guardar.classList.add("botones_seccion1")
                    boton_guardar.classList.add("ocul")
                    boton_guardar.innerHTML = buscarLiteral(literales, boton_guardar.id)
                    boton_guardar.onclick = e => {
                            e.preventDefault()
                            let bodyContent = {
                                nombre: document.getElementById('texto_nombre').value,
                                email: document.getElementById('texto_correo').value,
                                sexo: document.getElementById('texto_sexo').value,
                                perfil_busqueda: document.getElementById('texto_rol').value
                            }
                            let url = '../../back/controladores/actualizarPerfil.php'
                            let params = {
                                method: 'POST',
                                body: JSON.stringify(bodyContent)
                            }
                            fetch(url, params)
                                .then(req => req.json())
                                .then( datos => {
                                    if (datos === true) {
                                        location.reload()
                                    }
                                })
                        }

                    let boton_edicion = document.createElement('button')
                    boton_edicion.id = "boton_edicion"
                    boton_edicion.classList.add("botones_seccion1")
                    boton_edicion.innerHTML = buscarLiteral(literales, boton_edicion.id)
                    boton_edicion.onclick = e => {
                            e.preventDefault()
                            boton_guardar.classList = 'botones_seccion1 aparecer'
                            boton_edicion.classList = 'botones_seccion1 ocul'

                            let texto_nombre = document.getElementById('texto_nombre')
                            let datos_nombre = texto_nombre.innerHTML
                            texto_nombre.remove()
                            texto_nombre = document.createElement('input')
                            texto_nombre.id = "texto_nombre"
                            texto_nombre.classList.add('textos')
                            texto_nombre.type = "text"
                            texto_nombre.name = "usuario"
                            texto_nombre.maxLength = 50
                            texto_nombre.pattern = "^[A-Za-z0-9_-]{2,50}"
                            texto_nombre.value = datos_nombre
                            texto_nombre.required = true

                            caja_nombre.appendChild(texto_nombre)

                            let texto_correo = document.getElementById('texto_correo')
                            let datos_correo = texto_correo.innerHTML
                            texto_correo.remove()
                            texto_correo = document.createElement('input')
                            texto_correo.id = "texto_correo"
                            texto_correo.classList.add('textos')
                            texto_correo.type = "email"
                            texto_correo.name = "email" 
                            texto_correo.minLength = 5
                            texto_correo.maxLength = 150
                            texto_correo.pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            texto_correo.value = datos_correo

                            caja_correo.appendChild(texto_correo)

                            let select_sexo = document.getElementById('texto_sexo')
                            let datos_sexo = select_sexo.innerHTML
                            texto_sexo.remove()
                            select_sexo = document.createElement('select')
                            select_sexo.id = "texto_sexo"
                            select_sexo.classList.add('textos')
                            select_sexo.name = "sexo" 
                            select_sexo.required = true
                            
                            let option_hombre = document.createElement('option')
                            option_hombre.value = 1 
                            option_hombre.innerHTML = buscarLiteral(literales, select_sexo.id + '_hombre') 
                        
                            let option_mujer = document.createElement('option')
                            option_mujer.value = 2 
                            option_mujer.innerHTML = buscarLiteral(literales, select_sexo.id + '_mujer')
                        
                            let option_intersexo_hombre = document.createElement('option')
                            option_intersexo_hombre.value = 3 
                            option_intersexo_hombre.innerHTML = buscarLiteral(literales, select_sexo.id + '_intersexo_hombre')
                        
                            let option_intersexo_mujer = document.createElement('option')
                            option_intersexo_mujer.value = 4
                            option_intersexo_mujer.innerHTML = buscarLiteral(literales, select_sexo.id + '_intersexo_mujer')
                        
                            let option_otros = document.createElement('option')
                            option_otros.value = 5
                            option_otros.innerHTML = buscarLiteral(literales, select_sexo.id + '_otros') 

                            if(datos_sexo == buscarLiteral(literales, select_sexo.id + '_hombre')){
                                option_hombre.selected = true
                            }else if (datos_sexo == buscarLiteral(literales, select_sexo.id + '_mujer')){
                                option_mujer.selected = true
                            }else if (datos_sexo == buscarLiteral(literales, select_sexo.id + '_intersexo_hombre')){
                                option_intersexo_hombre.selected = true
                            }else if (datos_sexo == buscarLiteral(literales, select_sexo.id + '_intersexo_mujer')){
                                option_intersexo_mujer.selected = true
                            }else if (datos_sexo == buscarLiteral(literales, select_sexo.id + '_otros')){
                                option_otros.selected = true
                            }
                            select_sexo.appendChild(option_hombre)
                            select_sexo.appendChild(option_mujer)
                            select_sexo.appendChild(option_intersexo_hombre)
                            select_sexo.appendChild(option_intersexo_mujer)
                            select_sexo.appendChild(option_otros)
                
                            caja_sexo.appendChild(select_sexo)

                            let select_rol = document.getElementById('texto_rol')
                            let datos_rol = select_rol.innerHTML
                            texto_rol.remove()
                            select_rol = document.createElement('select')
                            select_rol.id = "texto_rol"
                            select_rol.classList.add('textos')
                            select_rol.name = "rol" 
                            select_rol.required = true
                            
                            let option_bus_hombre = document.createElement('option')
                            option_bus_hombre.value = 1 
                            option_bus_hombre.innerHTML = buscarLiteral(literales, select_rol.id + '_hombre') 
                        
                            let option_bus_mujer = document.createElement('option')
                            option_bus_mujer.value = 2
                            option_bus_mujer.innerHTML = buscarLiteral(literales, select_rol.id + '_mujer')
                        
                            let option_bus_intersexo_hombre = document.createElement('option')
                            option_bus_intersexo_hombre.value = 3 
                            option_bus_intersexo_hombre.innerHTML = buscarLiteral(literales, select_rol.id + '_intersexo_hombre')
                        
                            let option_bus_intersexo_mujer = document.createElement('option')
                            option_bus_intersexo_mujer.value = 4
                            option_bus_intersexo_mujer.innerHTML = buscarLiteral(literales, select_rol.id + '_intersexo_mujer')
                        
                            let option_bus_hombre_mujer = document.createElement('option')
                            option_bus_hombre_mujer.value = 5
                            option_bus_hombre_mujer.innerHTML = buscarLiteral(literales, select_rol.id + '_hombre_mujer')
                        
                            let option_bus_hombre_intersexo_hombre = document.createElement('option')
                            option_bus_hombre_intersexo_hombre.value = 6
                            option_bus_hombre_intersexo_hombre.innerHTML = buscarLiteral(literales, select_rol.id + '_hombre_intersexo_hombre')
                        
                            let option_bus_hombre_intersexo_mujer = document.createElement('option')
                            option_bus_hombre_intersexo_mujer.value = 7
                            option_bus_hombre_intersexo_mujer.innerHTML = buscarLiteral(literales, select_rol.id + '_hombre_intersexo_mujer')
                        
                            let option_bus_mujer_intersexo_hombre = document.createElement('option')
                            option_bus_mujer_intersexo_hombre.value = 8
                            option_bus_mujer_intersexo_hombre.innerHTML = buscarLiteral(literales, select_rol.id + '_mujer_intersexo_hombre')
                        
                            let option_bus_mujer_intersexo_mujer = document.createElement('option')
                            option_bus_mujer_intersexo_mujer.value = 9
                            option_bus_mujer_intersexo_mujer.innerHTML = buscarLiteral(literales, select_rol.id + '_mujer_intersexo_mujer')
                        
                            let option_bus_intersexo_hombre_intersexo_mujer = document.createElement('option')
                            option_bus_intersexo_hombre_intersexo_mujer.value = 10
                            option_bus_intersexo_hombre_intersexo_mujer.innerHTML = buscarLiteral(literales, select_rol.id + '_intersexo_hombre_intersexo_mujer')
                        
                            let option_bus_todos = document.createElement('option')
                            option_bus_todos.value = 11
                            option_bus_todos.innerHTML = buscarLiteral(literales, select_rol.id + '_todos') 
                        
                            if(datos_rol == buscarLiteral(literales, select_rol.id + '_hombre')){
                                option_bus_hombre.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_mujer')){
                                option_bus_mujer.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_intersexo_hombre')){
                                option_bus_intersexo_hombre.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_intersexo_mujer')){
                                option_bus_intersexo_mujer.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_hombre_mujer')){
                                option_bus_hombre_mujer.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_hombre_intersexo_hombre')){
                                option_bus_hombre_intersexo_hombre.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_hombre_intersexo_mujer')){
                                option_bus_hombre_intersexo_mujer.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_mujer_intersexo_hombre')){
                                option_bus_mujer_intersexo_hombre.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_mujer_intersexo_mujer')){
                                option_bus_mujer_intersexo_mujer.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_intersexo_hombre_intersexo_mujer')){
                                option_bus_intersexo_hombre_intersexo_mujer.selected = true
                            }else if (datos_rol == buscarLiteral(literales, select_rol.id + '_todos')){
                                option_bus_todos.selected = true
                            }
                            select_rol.appendChild(option_bus_hombre)
                            select_rol.appendChild(option_bus_mujer)
                            select_rol.appendChild(option_bus_intersexo_hombre)
                            select_rol.appendChild(option_bus_intersexo_mujer)
                            select_rol.appendChild(option_bus_hombre_mujer)
                            select_rol.appendChild(option_bus_hombre_intersexo_mujer)
                            select_rol.appendChild(option_bus_mujer_intersexo_hombre)
                            select_rol.appendChild(option_bus_mujer_intersexo_mujer)
                            select_rol.appendChild(option_bus_intersexo_hombre_intersexo_mujer)
                            select_rol.appendChild(option_bus_todos)

                            caja_rol.appendChild(select_rol)
                        }

                    let boton_anadir_publi = document.createElement('button')
                    boton_anadir_publi.id = "boton_anadir_publi"
                    boton_anadir_publi.classList.add("botones_seccion1")
                    boton_anadir_publi.innerHTML = buscarLiteral(literales, boton_anadir_publi.id)
                    boton_anadir_publi.onclick = e => {
                        e.preventDefault()
                        Swal.fire({
                            showDenyButton: true,
                            confirmButtonText: buscarLiteral(literales, "confirmar_alerta"),
                            denyButtonText: buscarLiteral(literales, "cancelar_alerta"),
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            },
                            html:   "<form id ='form_anadir_publi' name='form_anadir_publi' enctype='multipart/form-data'>"+
                                        "<input id='archivo' name='archivo' type='file' accept='.PNG,.JPG,.JPEG,.MP4,.OGV,.WEBM'>"+
                                        "<div id = 'padre_anadir_publi'>"+
                                            "<label id='texto_imagen' for='texto'>"+
                                            buscarLiteral(literales, 'texto_imagen')+ "</label>"+
                                            "<input id='texto' type='textarea'>"+
                                        "</div>"+
                                    "</form>",
                            preConfirm: () => {
                                const archivo = Swal.getPopup().querySelector('#archivo')
                                const texto = Swal.getPopup().querySelector('#texto').value
                                if (!archivo.value) {
                                    Swal.showValidationMessage(buscarLiteral(literales, 'validation_6'))
                                } else {
                                    return {
                                        archivo: archivo,
                                        texto: texto
                                    }
                                }
                            }
                        })
                            .then( response => {
                                let bodyContent = {
                                    texto: response.value.texto
                                }
                                let data = new FormData()
                                data.append('archivo', response.value.archivo.files[0])
                                data.append('bodyContent', JSON.stringify(bodyContent))
                                let url = '../../back/controladores/subirPublicacion.php'
                                let params = {
                                    method: 'POST',
                                    body: data
                                }
                                fetch(url, params)
                                    .then(req => req.json())
                                    .then( respuesta => {
                                        if (respuesta === true) {
                                            Swal.fire({
                                                text: buscarLiteral(literales, 'publicacion_anadida_correctamente'),
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
                                                .then( () => location.reload())
                                        } else {
                                            if (respuesta == 999) {
                                                Swal.fire({
                                                    text: buscarLiteral(literales, 'server_error_' + respuesta),
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
                                                    text: buscarLiteral(literales, "server_error_" + respuesta),
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
                            })
                    }

                    caja_botones_edicion.appendChild(boton_cambiar_contra)
                    caja_botones_edicion.appendChild(boton_guardar)
                    caja_botones_edicion.appendChild(boton_edicion)
                    caja_botones_edicion.appendChild(boton_anadir_publi)

                    caja_publi_edicion.appendChild(caja_botones_edicion)

                }else{
                    let caja_botones_edicion = document.createElement('div')
                    caja_botones_edicion.id = "caja_botones_edicion"

                    let boton_enviar_match = document.createElement('button')
                    boton_enviar_match.id = "boton_enviar_match"
                    boton_enviar_match.classList.add("botones_seccion1")
                    boton_enviar_match.innerHTML = buscarLiteral(literales, boton_enviar_match.id)
                    boton_enviar_match.onclick = e => {
                        e.preventDefault()
                        
                        let bodyContent = {
                            usuario: usuario.nick
                        }
                        let url = '../../back/controladores/enviarMatch.php'
                        let params = {
                            method: 'POST',
                            body: JSON.stringify(bodyContent)
                        }
                        fetch(url, params)
                            .then(req => req.json())
                            .then( datos => {
                                if (typeof datos !== 'number') {
                                    if (usuario.amor_tuyo == 1) {
                                        Swal.fire({
                                            width: 600,
                                            timer: 2000,
                                            showConfirmButton: false,
                                            padding: '3em',
                                            color: 'black',
                                            background: 'transparent',
                                            customClass: 'sweetAlertAmor'
                                        })
                                    }else{
                                        Swal.fire({
                                            title:  buscarLiteral(literales, 'texto_match_envio'),
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
                                    }
                                    caja_botones_edicion.remove()
                                } else {
                                    if (datos == 999) {
                                        Swal.fire({
                                            text: buscarLiteral(literales, 'server_error_' + datos), //error no metido todavia
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
                                            text: buscarLiteral(literales, "server_error_" + datos),
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
                    caja_botones_edicion.appendChild(boton_enviar_match)

                    if (usuario.amor_mio == 0) {
                        caja_publi_edicion.appendChild(caja_botones_edicion)
                    }
                }

                div_section1.appendChild(caja_perfil_imagen)
                div_section1.appendChild(caja_perfil)
                div_section1.appendChild(caja_publi_edicion)

                let div_btn_img_vid = document.createElement('div')
                div_btn_img_vid.id = "btnImgVid"

                let boton_imagenes = document.createElement('button')
                boton_imagenes.id = "btnImagenes"

                let h2_boton_imagenes = document.createElement('h2')
                h2_boton_imagenes.id = "h2_boton_imagenes"
                h2_boton_imagenes.innerHTML = buscarLiteral(literales, h2_boton_imagenes.id)
                h2_boton_imagenes.onclick = () =>{
                    div_dis_img.innerHTML = ""
                    for (const imagen of usuario.imagenes_publicadas) {
                        let caja_imagen = document.createElement('div')
                        caja_imagen.classList.add('caja_imagen')
                        caja_imagen.id = imagen.id

                        let imagen_interior = document.createElement('img')
                        imagen_interior.classList.add('imagen_interior')
                        imagen_interior.src = imagen.publi
                        imagen_interior.onclick = (e) => {
                            location.href = 'home.php?id=' + e.target.parentNode.id
                        }

                        caja_imagen.appendChild(imagen_interior)

                        div_dis_img.appendChild(caja_imagen)

                        if (mi_perfil === true) {
                            let x = document.createElement('img')
                            x.classList.add('x')
                            x.src = "front/img/imgPerfil/cancelar.png"
                            x.onclick = (e) => {
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
                                        let bodyContent = {
                                            id: e.target.parentNode.id
                                        }
                                        let url = '../../back/controladores/borrarPublicacion.php'
                                        let params = {
                                            method: 'POST',
                                            body: JSON.stringify(bodyContent)
                                        }
                                        fetch(url, params)
                                            .then(req => req.json())
                                            .then( datos => {
                                                if (datos === true) {
                                                    for (let i = 0; i < usuario.imagenes_publicadas.length; i++) {
                                                        const element = usuario.imagenes_publicadas[i];
                                                        if (element.id == e.target.parentNode.id) {
                                                            usuario.imagenes_publicadas.splice(i, 1);
                                                            break;
                                                        }
                                                    }
                                                    e.target.parentNode.remove()
                                                    Swal.fire({
                                                        text: buscarLiteral(literales, 'publicacion_borrada_correctamente'), //borrado correctamente
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
                                                    if (datos == 999) {
                                                        Swal.fire({
                                                            text: buscarLiteral(literales, 'server_error_' + datos),
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
                                                            text: buscarLiteral(literales, "server_error_" + datos),
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

                            caja_imagen.appendChild(x)
                        }
                    }
                    h2_boton_imagenes.classList.toggle("btnActivo")
                    h2_boton_videos.classList.remove("btnActivo")
                    div_dis_vid.classList.add("ocultar")

                    if (h2_boton_imagenes.classList.contains("btnActivo")){
                        div_dis_img.classList.remove("ocultar")
                    }else{
                        div_dis_img.classList.add("ocultar")
                    }

                }

                boton_imagenes.appendChild(h2_boton_imagenes)

                let boton_videos = document.createElement('button')
                boton_videos.id = "btnVideos"

                let h2_boton_videos = document.createElement('h2')
                h2_boton_videos.id = "h2_boton_videos"
                h2_boton_videos.innerHTML = buscarLiteral(literales, h2_boton_videos.id)
                h2_boton_videos.onclick = () =>{
                    div_dis_vid.innerHTML = ""
                    for (const video of usuario.videos_publicados) {
                        let caja_video = document.createElement('div')
                        caja_video.classList.add('caja_video')
                        caja_video.id = video.id

                        let video_interior = document.createElement('video')
                        video_interior.classList.add('video_interior')
                        video_interior.src = video.publi
                        video_interior.controls = true

                        if (mi_perfil === true) {
                            let x = document.createElement('img')
                            x.classList.add('x')
                            x.src = "front/img/imgPerfil/cancelar.png"
                            x.onclick = (e) => {
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
                                        let bodyContent = {
                                            id: e.target.parentNode.id
                                        }
                                        let url = '../../back/controladores/borrarPublicacion.php'
                                        let params = {
                                            method: 'POST',
                                            body: JSON.stringify(bodyContent)
                                        }
                                        fetch(url, params)
                                            .then(req => req.json())
                                            .then( datos => {
                                                if (datos === true) {
                                                    for (let i = 0; i < usuario.videos_publicados.length; i++) {
                                                        const element = usuario.videos_publicados[i];
                                                        if (element.id == e.target.parentNode.id) {
                                                            usuario.videos_publicados.splice(i, 1);
                                                            break;
                                                        }
                                                    }
                                                    e.target.parentNode.remove()
                                                    Swal.fire({
                                                        text: buscarLiteral(literales, 'publicacion_borrada_correctamente'), //borrado correctamente
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
                                                    if (datos == 999) {
                                                        Swal.fire({
                                                            text: buscarLiteral(literales, 'server_error_' + datos),
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
                                                            text: buscarLiteral(literales, "server_error_" + datos),
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

                            caja_video.appendChild(x)
                        }
                        caja_video.appendChild(video_interior)
                        div_dis_vid.appendChild(caja_video)
                    }

                    h2_boton_videos.classList.toggle("btnActivo")
                    h2_boton_imagenes.classList.remove("btnActivo")
                    div_dis_img.classList.add("ocultar")

                    if (h2_boton_videos.classList.contains("btnActivo")){
                        div_dis_vid.classList.remove("ocultar")
                    }else{
                        div_dis_vid.classList.add("ocultar")
                    }
                }

                boton_videos.appendChild(h2_boton_videos)

                div_btn_img_vid.appendChild(boton_imagenes)
                div_btn_img_vid.appendChild(boton_videos)

                let div_dis_img = document.createElement('div')
                div_dis_img.classList.add("disImg")
                div_dis_img.classList.add("ocultar")

                let div_dis_vid = document.createElement('div')
                div_dis_vid.classList.add("disVid")
                div_dis_vid.classList.add("ocultar")

                let div_caj_videos = document.createElement('div')
                div_caj_videos.id = "cajVideos"


                div_dis_vid.appendChild(div_caj_videos)

                main.appendChild(div_section1)
                main.appendChild(div_btn_img_vid)
                main.appendChild(div_dis_img)
                main.appendChild(div_dis_vid)
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