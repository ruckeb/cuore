window.onload = ()=>{
    var btnImagenes = document.getElementById("btnImagenes");
    var btnVideos = document.getElementById("btnVideos");
    var menu =document.getElementById("menu");

    var disImg = document.getElementById("disImg");
    var disVid = document.getElementById("disVid");
    var disMenu = document.getElementById("disMenu")

    menu.onclick = function (e) {
        e.preventDefault();
        disMenu.style.display = "block";
    }

    btnImagenes.onclick = function (e) {
        e.preventDefault();
        disImg.style.display = "block";
        disVid.style.display = "none";
    }

    btnVideos.onclick = function (e) {
        e.preventDefault();
        disVid.style.display = "block";
        disImg.style.display = "none";
    }
    
}