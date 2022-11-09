(() => {
    'use strict'
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })


const config = document.querySelector("#config");
const fav = document.querySelector("#fav");
const count_delt = document.querySelector("#delete");
const topic = document.querySelector("#topic")

window.addEventListener('DOMContentLoaded', ()=>{
  config_page()
})

config.addEventListener('click', e=>{
  config.setAttribute("class","nav-link active")
  config.setAttribute("aria-current","page")

  fav.setAttribute("class","nav-link link-dark")
  fav.removeAttribute("aria-current")

  count_delt.setAttribute("class","nav-link link-dark")
  count_delt.removeAttribute("aria-current")

  config_page()
});
fav.addEventListener('click', e=>{
  fav.setAttribute("class","nav-link active")
  fav.setAttribute("aria-current","page")

  config.setAttribute("class","nav-link link-dark")
  config.removeAttribute("aria-current")

  count_delt.setAttribute("class","nav-link link-dark")
  count_delt.removeAttribute("aria-current")

  fav_page()
});
count_delt.addEventListener('click', e=>{
  count_delt.setAttribute("class","nav-link active")
  count_delt.setAttribute("aria-current","page")

  config.setAttribute("class","nav-link link-dark")
  config.removeAttribute("aria-current")

  fav.setAttribute("class","nav-link link-dark")
  fav.removeAttribute("aria-current")

  count_page()
});

function config_page(){

  topic.innerHTML=
  `
  <H1>Configuracion</H1>
  <hr>
    <div id="page" class="d-flex justify-content-center">
      <div>
      <H2>Cambiar imagen</H2>
        <div class="d-flex justify-content-center mb-4">
          <img src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg" class="rounded-circle" alt="example placeholder" style="width: 200px;" />
        </div>
        <div class="d-flex justify-content-center">
          <div class="btn btn-primary btn-rounded">
            <label class="form-label text-white m-1" for="customFile2">Choose file</label>
            <input type="file" class="form-control d-none" id="customFile2" />
          </div>
        </div>
        <hr>
      </div>
      <hr>
    </div>
    
  `
}

function fav_page(){
  topic.innerHTML=
  `
  <H1>Favoritos</H1>
  <div id="page" class="align-items-center">
  </div>
  `
}

function count_page(){
  topic.innerHTML=
  `
  <H1>Eliminar Cuenta</H1>
  <div id="page" class="align-items-center">
  </div>
  `
}