/*!
* Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/

const corredor = document.querySelector('#corredores')

const config = document.querySelector("#config")
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });

    var url = document.querySelectorAll('.url');
    var titulo = document.querySelectorAll('.title_useful');
    var i;
    for (i = 0; i < url.length; i++) {
        url[i].setAttribute('href', "/posts/"+titulo[i].textContent)
    }
})

corredor.addEventListener('click', e =>{
    var med = prompt("Nombre del post", "Videojuegos")
    if (med != null){
        if (med == ""){
            alert("Agregue un nombre para el post")
        }else{
            var mid2 = "/postRegistro/crear/"+med
            console.log(mid2)
            window.location.href = mid2
        }
    }
});

config.addEventListener('click',async e =>{

    const response = await fetch("/CurrentUser")
    const data = await response.json()
    
    console.log(data)

    var mid2 = "/"+data+"/user_config"

    window.location.href = mid2
});




