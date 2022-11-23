(() => {
    'use strict'
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })

const post = document.querySelector("#post");
const config = document.querySelector("#config");
const fav = document.querySelector("#fav");
const count_delt = document.querySelector("#delete");
const topic = document.querySelector("#topic")
const PagePost = document.querySelector("#PagePost")
const PageConfig = document.querySelector("#PageConfiguracion")
var listadeNombres;
const warningName = document.querySelector("#UsernameHelp")

var btnEditarEdit = document.querySelectorAll(".editarEdit")
var btnEliminarEdit = document.querySelectorAll(".eliminarEdit")

var btnEditarPost = document.querySelectorAll(".editarPost")
var btnEliminarPost = document.querySelectorAll(".eliminarPost")

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

  post.setAttribute("class","nav-link link-dark")
  post.removeAttribute("aria-current")

  config_page()
});

post.addEventListener("click", e=>{
  post.setAttribute("class","nav-link active")
  post.setAttribute("aria-current","page")

  config.setAttribute("class","nav-link link-dark")
  config.removeAttribute("aria-current")

  post_page()
  actualizar()
  listeners()
})
function listeners (){
  btnEditarEdit.forEach(edit =>{
    edit.addEventListener("click", EditarEdit)
  })
  btnEliminarEdit.forEach(del =>{
    del.addEventListener("click", DeleteEdit)
  })
  btnEditarPost.forEach(edit =>{
    edit.addEventListener('click', EditarPost)
  })
  btnEliminarPost.forEach(dela =>{
    dela.addEventListener('click', DeletePost)
  })
}

async function DeletePost(){
  var titulo = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild
  var elem_id = this.parentElement.parentElement.parentElement.getElementsByClassName("id").namedItem("idPost")
  var id_post = elem_id.innerText
  var a = confirm("¿Seguro que quieres eliminar " + titulo.innerText + "?")

  if (a == true){
    var response = await fetch('/DeletePost', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'id': id_post
      })
  })
  var data = await response.json()  

  console.log(data)

  titulo.parentElement.parentElement.remove()

  }else{

  }

}

async function EditarPost(){
  var postTitulo = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild
  var postResumen = this.parentElement.parentElement.parentElement.getElementsByClassName("resume").namedItem("resume")
  var postId = this.parentElement.parentElement.parentElement.getElementsByClassName("id").namedItem("idPost")

  if (postTitulo.hasAttribute("type")){
    if(postTitulo.value.trim() != "" && postResumen.value.trim() != ""){

      this.setAttribute("style", "")

      var newTitulo = postTitulo.value
      var newResumen = postResumen.value

      var field = document.createElement("div")
      var field2 = document.createElement("div")

      field.innerText = newTitulo
      field2.innerText = newResumen

      field2.setAttribute("class", "resume")
      field2.setAttribute("name", "resume")
  

      postTitulo.replaceWith(field)
      postResumen.replaceWith(field2)

      var id_post = postId.innerText
//sdfasdsadasdas
      var response = await fetch('/UpdatePost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'titulo': newTitulo,
            'resumen': newResumen,
            'id': id_post
        })
    })
    var data = await response.json()  
    console.log(data)
    }else{
      console.log("Titulo Vacio")
    }
  }else{
    this.setAttribute("style", `opacity: 1;
    transform: scale(1.3);`)

    var titulo = postTitulo.innerText
    var resumen = postResumen.innerText
  
    var field = document.createElement("input")
    var field2 = document.createElement("input")

    field.setAttribute("type","text")
    field.setAttribute("value", titulo)
    field.setAttribute("placeholder", titulo)
    

    field2.setAttribute("type","text")
    field2.setAttribute("value", resumen)
    field2.setAttribute("placeholder", resumen)
    field2.setAttribute("class", "resume")
    field2.setAttribute("name", "resume")

    postTitulo.replaceWith(field)
    postResumen.replaceWith(field2)
    

  }
}

async function DeleteEdit(){
  var titulo = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild
  var elem_id = this.parentElement.parentElement.parentElement.getElementsByClassName("id").namedItem("idEdit")
  var id_edit = elem_id.innerText
  var a = confirm("¿Seguro que quieres eliminar " + titulo.innerText + "?")
  if (a == true){
    var response = await fetch('/DeleteEdit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'id': id_edit
      })
  })
  var data = await response.json()  
  console.log(data)

  titulo.parentElement.parentElement.remove()

  }else{

  }
}

async function EditarEdit(){
  var editTitulo = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild
  if (editTitulo.hasAttribute("type")){
    if(editTitulo.value.trim() != ""){
      var newTitulo = editTitulo.value
      this.setAttribute("style", "")
      var field = document.createElement("div")
      field.innerText = newTitulo
      editTitulo.replaceWith(field)

      var elem_id = this.parentElement.parentElement.parentElement.getElementsByClassName("id").namedItem("idEdit")
      var id_edit = elem_id.innerText

      var response = await fetch('/UpdateTitleEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'titulo': newTitulo,
            'id': id_edit
        })
    })
    var data = await response.json()  

    console.log(data)

    }else{
      console.log("Titulo Vacio")
    }
  }else{
    this.setAttribute("style", `opacity: 1;
    transform: scale(1.3);`)
    var titulo = editTitulo.innerText
    console.log(titulo)
  
    var field = document.createElement("input")

    field.setAttribute("type","text")
    field.setAttribute("value", titulo)
    editTitulo.replaceWith(field)
    

  }
  
}

function actualizar(){
  btnEditarEdit = document.querySelectorAll(".editarEdit")
  btnEliminarEdit = document.querySelectorAll(".eliminarEdit")

  btnEditarPost = document.querySelectorAll(".editarPost")
  btnEliminarPost = document.querySelectorAll(".eliminarPost")
}

function config_page(){
  PageConfig.removeAttribute("style")
  PagePost.setAttribute("style", "display:none;")
}

function post_page(){
  PagePost.removeAttribute("style")
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
  if(data == "Done"){
    document.getElementById("UsernameSucces").removeAttribute("style")
  }
  }
})

inputName.addEventListener('input', async e=>{
  var nombre = inputName.value
  if (this.listadeNombres == undefined){
    const response = await fetch("/ListOfNames");
    const data = await response.json()
    this.listadeNombres = data
  }else{
    for( var i = 0; i<this.listadeNombres.length; i++){
      var nombreLista = this.listadeNombres[i][0].toLowerCase()
      if(nombreLista == nombre.toLowerCase()){
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

    console.log(data)
    if(data == "Done" ){
      document.getElementById("ImageSucces").removeAttribute("style")
    }else{
      document.getElementById("ImageFailure").removeAttribute("style")
    }
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



