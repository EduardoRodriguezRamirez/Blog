/*!
* Start Bootstrap - Clean Blog v6.0.8 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/

const crearPost = document.querySelector('#CrearPost')

const config = document.querySelector("#config")

const buttonS = document.querySelector("#ButtonSearchPost")

const icono = document.querySelector("#IconoUsuario")

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
                buttonS.setAttribute("class","btn btn-outline-dark")
                icono.setAttribute("class", "IconoRepre-dark")
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
                buttonS.setAttribute("class","btn btn-outline-light")
                icono.setAttribute("class", "IconoRepre-light")
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

crearPost.addEventListener('click', e =>{
    var med = document.getElementById("namePost").value
    if (med != null){
        if (med.trim() == ""){
            alert("Agregue un nombre para el post")
        }else{
            var mid2 = "/postRegistro/crear/"+med
            console.log(mid2)
            window.location.href = mid2
        }
    }
});
config.addEventListener('click', async e =>{

    const response = await fetch("/CurrentUser")
    const data = await response.json()

    var mid2 = "/"+data+"/user_count"

    window.location.href = mid2
});


  const mediumBp = matchMedia('(min-width: 992px)');
  const changeSize = mql =>{
      mql.matches
        ? icono.setAttribute("class", "IconoRepre-light") 
        : buttonS.setAttribute("class", "btn btn-outline-dark");
    
        mql.matches
            ? buttonS.setAttribute("class", "btn btn-outline-light") 
            : icono.setAttribute("class", "IconoRepre-dark")
           
  }

 
  mediumBp.addListener(changeSize)
  changeSize(mediumBp)


