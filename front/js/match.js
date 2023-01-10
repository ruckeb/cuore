import { getCookie, setCookie, buscarLiteral } from "./utils.js";
var literales
var usuario_logueado

window.onload = ()=>{

    function cargarLiterales() {
        let bodyContent = {
            id_html: 'match',
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
                        cargarMatch()
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

function cargarMatch() {
    cargarCabecera()
    cargarMain()
    cargarFooter()
}

function cargarCabecera() {
    let header = document.body.children[0]

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

    let imagen_logo_cuore = document.createElement('img')
    imagen_logo_cuore.id = "logo"
    imagen_logo_cuore.src = "front/img/imgLogo/logo.png"
    imagen_logo_cuore.title = "Logo"
    imagen_logo_cuore.onclick = () => {
        location.href = "home.php"
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

    if (usuario_logueado.premium == 1) {
        let boton_menu2 = document.createElement('button')
        boton_menu2.id = "boton_menu2"
        boton_menu2.classList.add("btnMenu")
        boton_menu2.onclick = (e) => {
            e.preventDefault()
            location.href = 'chatPrivado.php' 
        }

        let p_menu2 = document.createElement('p')
        p_menu2.id = "p_menu2"
        p_menu2.innerHTML = buscarLiteral(literales, p_menu2.id) //Caja2

        boton_menu2.appendChild(p_menu2)

        div_tabla_menu.appendChild(boton_menu2)
    }
    
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

    div_tabla_menu.appendChild(boton_menu1)
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

    function cargarBloque1(usuarios) {
        let bloque1 = document.createElement('div')
        bloque1.id = "bloque1"

        let titulo_bloque1 = document.createElement('h1')
        titulo_bloque1.id = "titulo_bloque1"
        titulo_bloque1.innerHTML = buscarLiteral(literales, titulo_bloque1.id)

        let caja_usuarios_match = document.createElement('div')
        caja_usuarios_match.classList.add("caja_usuarios_match")
        
        for (const usuario of usuarios) {
            let caja_usuario_match = document.createElement('div')
            caja_usuario_match.classList.add('caja_usuario_match')

            let usuarios_match = document.createElement('p')
            usuarios_match.classList.add("usuarios_match")
            usuarios_match.innerHTML =usuario.nick

            let boton_borrar = document.createElement('button')
            boton_borrar.id = "boton_borrar"
            boton_borrar.innerHTML = buscarLiteral(literales, boton_borrar.id)
            boton_borrar.onclick = (e) => {
                e.preventDefault
                let bodyContent = {
                    nick: usuario.nick,
                }
                let url = '../../back/controladores/eliminarMatch.php'
                let params = {
                    method: 'POST',
                    body: JSON.stringify(bodyContent)
                }
                fetch(url, params)
                    .then(req => req.json())
                    .then( eliminado => {
                        if (eliminado === true) {
                            e.target.parentNode.remove()
                        } else {
                            if (eliminado == 999) {
                                Swal.fire({
                                    text: buscarLiteral(literales, 'server_error_' + eliminado),
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
                                    text: buscarLiteral(literales, "server_error_" + eliminado),
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

            caja_usuario_match.appendChild(usuarios_match)
            caja_usuario_match.appendChild(boton_borrar)

            caja_usuarios_match.appendChild(caja_usuario_match)
        }

        bloque1.appendChild(titulo_bloque1)
        bloque1.appendChild(caja_usuarios_match)

        main.appendChild(bloque1)
    }

    function cargarBloque2(usuarios) {
        let bloque2 = document.createElement('div')
        bloque2.id = "bloque2"

        let titulo_bloque2 = document.createElement('h1')
        titulo_bloque2.id = "titulo_bloque2"
        titulo_bloque2.innerHTML = buscarLiteral(literales, titulo_bloque2.id)

        let caja_usuarios_match = document.createElement('div')
        caja_usuarios_match.classList.add("caja_usuarios_match")
        
        for (const usuario of usuarios) {
            let caja_usuario_match = document.createElement('div')
            caja_usuario_match.classList.add("caja_usuario_match")

            let usuarios_match = document.createElement('p')
            usuarios_match.classList.add("usuarios_match")
            usuarios_match.innerHTML = usuario.nick

            caja_usuario_match.appendChild(usuarios_match)

            caja_usuarios_match.appendChild(caja_usuario_match)
        }

        bloque2.appendChild(titulo_bloque2)
        bloque2.appendChild(caja_usuarios_match)

        main.appendChild(bloque2)
    }


    let main = document.body.children[1]
    main.innerHTML = ""

    let url = '../../back/controladores/getMatchEnviados.php'
    let params = {
        method: 'GET',
    }
    fetch(url, params)
        .then(req => req.json())
        .then( usuarios => {
            if (typeof usuarios == "numeric") {
                if (usuarios == 999) {
                    Swal.fire({
                        text: buscarLiteral(literales, 'server_error_' + usuarios),
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
                        text: buscarLiteral(literales, "server_error_" + usuarios),
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                }
            } else {
                cargarBloque1(usuarios)
                if (usuario_logueado.premium == 1) {
                    let url = '../../back/controladores/getMatchConjuntos.php'
                    let params = {
                        method: 'GET',
                    }
                    fetch(url, params)
                        .then(req => req.json())
                        .then( usuarios => {
                            if (typeof usuarios == "numeric") {
                                if (usuarios == 999) {
                                    Swal.fire({
                                        text: buscarLiteral(literales, 'server_error_' + usuarios),
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
                                        text: buscarLiteral(literales, "server_error_" + usuarios),
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    })
                                }
                            } else {
                                cargarBloque2(usuarios)
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