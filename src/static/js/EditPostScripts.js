//Definicion de variables y constantes
var element = document.querySelectorAll(".elemento")
var num_id = element.length

var act = false

var botonEliminar = document.querySelectorAll(".elemento .botonEliminar")
var botonTitulo = document.querySelectorAll(".elemento .absolute2 .botonTitulo")
var botonParrafo = document.querySelectorAll(".elemento .absolute2 .botonParrafo")
var vista = document.querySelectorAll(".view")

const btn = document.getElementById("btnTargeta")
const ctdr = document.getElementById("ctdr")

const targeta = document.getElementById("BaseFondo")

//Cada vez que se haga click en el boton determinado se removera su padre DIV
const Click = function (evento){
    //console.log("El texto que tiene es: ", this.parentElement.getAttribute("id"));
    //this.style.borderColor = "blue";
    this.parentElement.remove()
    element = document.querySelectorAll(".elemento")
    if(element.length == 0){
      targeta.setAttribute("style","display:none")
    }
}

const Titulo = function (evento){
  elemento_view = this.parentElement.parentElement
  elemento_view.setAttribute("class", "elemento titulo")
  editStart(24, elemento_view.firstElementChild)
  console.log("Titulo: " + elemento_view.getAttribute("id"))
}

const Parrafo = function (evento){
  elemento_view = this.parentElement.parentElement
  elemento_view.setAttribute("class", "elemento parrafo")
  editStart(12, elemento_view.firstElementChild)
  console.log("Parrafo: " + elemento_view.getAttribute("id"))
}

const Targeta = function(evento){
  elemento_view = this.parentElement
  size1 = this.style.fontSize.toString().replace("pt","")
  editStart(size1, this);
  console.log("Targeta: "+elemento_view.getAttribute("id"))
}

//Al inciar se realizara este metodo
EscBotones()
//Se agregará un listener por cada boton
function EscBotones(){
    botonEliminar.forEach(boton =>{
        boton.addEventListener("click", Click);
    })
    botonTitulo.forEach(e =>{
      e.addEventListener("click", Titulo)
    })
    botonParrafo.forEach(a =>{
      a.addEventListener("click", Parrafo)
    })
    vista.forEach(ele =>{
      ele.addEventListener("dblclick", Targeta)
    })
}

//Al presionar click para agregar una nueva targeta
btn.addEventListener('click', e=>{

  num_id = num_id +1

  //Se resetean las variables
  act()

  //Se crea la targeta
  var a= document.createElement("div")
  a.innerHTML = `
    <div id="view" class="view" style="font-size: 14pt;"></div>
      <div class="absolute btn btnT botonEliminar"><img src="../static/img/cancelar.png" alt="" id="cancelar"></div>
        <div class="absolute2" >
        <div class="btn btnT botonTitulo" id="TargetaT"><img src="../static/img/titulo.png" alt="" id="fontTitulo"></div>
        <div class="btn btnT botonParrafo" id="TargetaP"><img src="../static/img/fuente.png" alt="" id="fontTexto"></div>
      </div>   
    <div class="absolute3 btn btnT">BtnI</div> 
  `
  a.setAttribute("class", "elemento")
  //Se establece el id de la targeta
  a.setAttribute("id", num_id)
  //Se agrega al html
  ctdr.append(a)
  
  //Se resetean las variables
  act()

  //Se resetean los listeners
  EscBotones()

  element = document.querySelectorAll(".elemento")
  if(element.length != 0 ){
    targeta.setAttribute("style", "")
  }
})

//Reconteo de los elementos y botones
function act(){
  element = document.querySelectorAll(".elemento")
  botonEliminar = document.querySelectorAll(".elemento .botonEliminar")
  botonTitulo = document.querySelectorAll(".elemento .botonTitulo")
  botonParrafo = document.querySelectorAll(".elemento .botonParrafo")
  vista = document.querySelectorAll(".view")
}

function editStart(fontSize, elemento_view) {

  var area = document.createElement('textarea');

  area.className = 'edit';
  area.value = elemento_view.innerText;

  var alturaE = elemento_view.clientHeight
  var ancho = elemento_view.clientWidth

  console.log(elemento_view.clientWidth)

  area.onkeydown = function(event) {
    if (event.key == 'Enter') {
      this.blur();
    }
  };

  area.onblur = function() {
    editEnd(fontSize, elemento_view, area);
  };
  area.setAttribute("style",`height:`+alturaE+`px; font-size: `+fontSize+`pt; max-width:`+ancho+`px;`)
  elemento_view.replaceWith(area);
  area.focus();
}

function editEnd(fontSize, elemento_view, area) {
  elemento_view.innerText = area.value;
  area.replaceWith(elemento_view);
  elemento_view.setAttribute("style", "font-size:"+fontSize+"pt;")
}

function Change(){
  
}