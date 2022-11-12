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
const PageConfig = document.querySelector("#PageConfiguracion")
const PageFav = document.querySelector("#PageFav")
const PageCount = document.querySelector("#PageCount")
var listadeNombres;
const warningName = document.querySelector("#UsernameHelp")

window.addEventListener('DOMContentLoaded', async ()=>{
  config_page()
  var name = document.getElementById("name")
    var response2 = await fetch("/CurrentUser")
    var data2 = await response2.json()
    name.textContent = data2
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
  PageConfig.removeAttribute("style")
  PageFav.setAttribute("style", "display:none;")
  PageCount.setAttribute("style", "display:none;")
}

function fav_page(){
  PageFav.removeAttribute("style")
  PageConfig.setAttribute("style", "display:none;")
  PageCount.setAttribute("style", "display:none;")
}

function count_page(){
  PageCount.removeAttribute("style")
  PageFav.setAttribute("style", "display:none;")
  PageConfig.setAttribute("style", "display:none;")
}

const btnName = document.querySelector("#btnName");
const inputName = document.querySelector("#username");

btnName.addEventListener('click', async e=>{
  if(warningName.hasAttribute("style","display:none;")){
    var response = await fetch('/ChangeName/'+inputName.value, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
  });
  const data = await response.json();
  }
})

inputName.addEventListener('input', async e=>{
  if (this.listadeNombres == undefined){
    const response = await fetch("/ListOfNames");
    const data = await response.json()
    this.listadeNombres = data
  }else{
    for( var i = 0; i<this.listadeNombres.length; i++){
      if(this.listadeNombres[i] == inputName.value){
        warningName.removeAttribute("style")
        return;
      }
    }
    warningName.setAttribute("style","display:none")
  }
})

const inputNewPsw = document.querySelector("#psswd")
const inputConfNewPsw = document.querySelector("#Confirmpsswd")
const inputOldPsw = document.querySelector("#Oldpsswd")
const btnPsw = document.querySelector("#btnPsw")

const warningNewPsw = document.querySelector("#psswdConfHelp")
const warningBlank = document.querySelector("#psswdOldHelppsswdOldHelp")

inputConfNewPsw.addEventListener('blur', e=>{
  if(inputNewPsw.value != inputConfNewPsw.value){
    warningNewPsw.removeAttribute("style")
  }else{
    warningNewPsw.setAttribute("style","display:none;")
  }
})
btnPsw.addEventListener('click', async e=>{
  if(inputNewPsw.value == "" || inputOldPsw.value == ""){
    warningBlank.removeAttribute("style")
  }else{
    warningBlank.setAttribute("style", "display:none;");
    if(warningNewPsw.hasAttribute("style", "display:none;")){

      var response = await fetch('/ChangePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'NewPsw':inputNewPsw.value,
          'OldPsw':inputOldPsw.value
        })
    });
    }
    const data = await response.json();
    if(data == "Si cambio"){
      inputNewPsw.value = "";
      inputConfNewPsw.value = "";
      inputOldPsw.value = "";
      warningBlank.removeAttribute("style")
      warningBlank.setAttribute("class", "form-text Success")
      warningBlank.textContent = "Contraseña cambiada"
    }else{
      warningBlank.removeAttribute("style")
      warningBlank.setAttribute("class", "form-text text-muted")
      warningBlank.textContent = "La vieja contraseña es incorrecta"
    }
  }
})

const image2 = document.getElementById("customFile2")

image2.addEventListener('input', e=>{
  var img = document.getElementById("tagImage");
  if (image2.value != ""){
    var fReader = new FileReader();
  fReader.readAsDataURL(image2.files[0]);
  fReader.onloadend = async function(event){
    
    img.src = event.target.result;
  
    var response = await fetch('/ChangeImage', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'foto': img.src
      })
    });
  
    const data = await response.json();

  }
  }
})

const corredor = document.querySelector('#corredores')

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

config.addEventListener('click', async e =>{

  const response = await fetch("/CurrentUser")
  const data = await response.json()
  
  console.log(data)

  var mid2 = "/"+data+"/user_count"

  window.location.href = mid2
});



