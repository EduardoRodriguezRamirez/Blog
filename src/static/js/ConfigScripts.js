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
  <div class="d-flex justify-content-center">
  <h1 class="title">Configuración</h1>
</div>
<div class="list-group list-group-flush border-bottom scrollarea">
  <div id="page">
    <div class="list-group-item">
      <h2>Cambiar Nombre</h2>
      <form>
        <div class="form-group">
          <label for="username">Nuevo Nombre</label>
          <input type="text" class="form-control" id="username" aria-describedby="nameOfUser" placeholder="Ingrese nuevo nombre">
          <small id="UsernameHelp" class="form-text text-muted">El nombre ya está en uso.</small>
        </div>
        <button type="submit" class="btn btn-primary">Cambiar</button>
      </form>
    </div>
    <div class="list-group-item">
      <h2>Cambiar Contraseña</h2>
      <form>
        <div class="form-group">
          <label for="psswd">Nueva contraseña</label>
          <input type="password" class="form-control" id="psswd" aria-describedby="passwordOfUser" placeholder="Ingrese nueva contraseña">
        </div>
        <div class="form-group">
          <label for="Confirmpsswd">Confirmar Nueva contraseña</label>
          <input type="password" class="form-control" id="Confirmpsswd" aria-describedby="passwordOfUser" placeholder="Ingrese nueva contraseña">
          <small id="psswdConfHelp" class="form-text text-muted">Las contraseñas no coinciden.</small>
        </div>
        <div class="form-group">
          <label for="Oldpsswd">Vieja contraseña</label>
          <input type="password" class="form-control" id="Oldpsswd" aria-describedby="passwordOfUser" placeholder="Ingrese vieja contraseña">
          <small id="psswdOldHelp" class="form-text text-muted">La contraseña no es valida.</small>
        </div>
        <button type="submit" class="btn btn-primary">Cambiar</button>
      </form>
    </div>
    <div class="list-group-item">
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
    </div>
  </div>
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
/*
   <hr>
    <div id="page" class="d-flex justify-content-center flex-column">
      <div>
        <h2>Cambiar Nombre</h2>
        <form>
          <div class="form-group">
            <label for="username">Nuevo Nombre</label>
            <input type="text" class="form-control" id="username" aria-describedby="nameOfUser" placeholder="Ingrese nuevo nombre">
            <small id="UsernameHelp" class="form-text text-muted">El nombre ya está en uso.</small>
          </div>
          <button type="submit" class="btn btn-primary">Cambiar</button>
        </form>
      </div>
      <div>
        <hr>
      </div>
      <div>
        <h2>Cambiar Contraseña</h2>
        <form>
          <div class="form-group">
            <label for="psswd">Nueva contraseña</label>
            <input type="password" class="form-control" id="psswd" aria-describedby="passwordOfUser" placeholder="Ingrese nueva contraseña">
          </div>
          <div class="form-group">
            <label for="Confirmpsswd">Confirmar Nueva contraseña</label>
            <input type="password" class="form-control" id="Confirmpsswd" aria-describedby="passwordOfUser" placeholder="Ingrese nueva contraseña">
            <small id="psswdConfHelp" class="form-text text-muted">Las contraseñas no coinciden.</small>
          </div>
          <div class="form-group">
            <label for="Oldpsswd">Vieja contraseña</label>
            <input type="password" class="form-control" id="Oldpsswd" aria-describedby="passwordOfUser" placeholder="Ingrese vieja contraseña">
            <small id="psswdOldHelp" class="form-text text-muted">La contraseña no es valida.</small>
          </div>
          <button type="submit" class="btn btn-primary">Cambiar</button>
        </form>
      </div>
      <div>
        <hr>
      </div>
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
      </div>
      <div>
        <hr>
      </div>

    </div>
*/