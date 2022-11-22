//Definicion de variables y constantes
var BotonEliminar = document.querySelectorAll(".botonEliminar")
var BotonTitulo = document.querySelectorAll(".botonTitulo")
var BotonParrafo = document.querySelectorAll(".botonParrafo")
var BotonImagen = document.querySelectorAll(".botonImagen")

var EditarTargeta = document.querySelectorAll(".view")
var AgregarTargeta = document.getElementById("btnTargeta")

var FondoTargetas = document.getElementById("BaseFondo")
var Ctdr = document.getElementById("ctdr")
var Elemento = document.querySelectorAll(".elemento")
var num_id = Elemento.length


var EliminarTargeta = function (evento){
  var TargetaPersonal = this.parentElement
  TargetaPersonal.remove()

  actualizarElementos()
  if(elementosVacios()){
    FondoTargetas.setAttribute("style","display:none")
  }
}

var TargetaTitulo = function (evento){
  var TargetaPersonal = this.parentElement.parentElement
  TargetaPersonal.setAttribute("class", "elemento titulo")

  var View = TargetaPersonal.firstElementChild
  var fuente = 24

  var BotonImagen = this.nextElementSibling.nextElementSibling
  BotonImagen.setAttribute("style","display:none")

  editStart(fuente, View)

//console.log("Titulo: " + targetaPersonal.getAttribute("id"))
}

var TargetaParrafo = function (evento){
  var TargetaPersonal = this.parentElement.parentElement
  TargetaPersonal.setAttribute("class", "elemento parrafo")

  var View = TargetaPersonal.firstElementChild
  var fuente = 12

  var BotonImagen = this.nextElementSibling
  BotonImagen.setAttribute("style","display:none")

  editStart(fuente, View)
//console.log("Parrafo: " + targetaPersonal.getAttribute("id"))
}

var TargetaImagen = function(evento){
  var TargetaPersonal = this.parentElement.parentElement
  TargetaPersonal.setAttribute("class", "elemento imagen")

  var View = TargetaPersonal.firstElementChild

  dragDropStart(View)
}

var TargetaEditable = function(evento){
  var TargetaPersonal = this.parentElement
  var fontActual = this.style.fontSize.toString().replace("pt","")
  var View = this

  if(TargetaPersonal.getAttribute("class") == "elemento"){
    TargetaPersonal.setAttribute("class", "elemento parrafo")
  }
  editStart(fontActual, View);
//console.log("Targeta: "+targetaPersonal.getAttribute("id"))
}

var SeleccionarArchivo = function(evento){
  var InputImage = this.nextElementSibling;
  InputImage.click();
}

var CargarArchivo = function(evento){
  var DropAreaPersonal = this.parentElement;
  files = this.files;
  DropAreaPersonal.classList.add("active");
  showFiles(files[0], DropAreaPersonal);
  DropAreaPersonal.classList.remove("active");
}

var DragDentro = function(evento){
  evento.preventDefault()
  var DropArea = this
  var Texto = this.firstElementChild
  DropArea.classList.add("active")
  Texto.textContent = "Suelta para subir la imagen"
}

var DragFuera = function(evento){
  evento.preventDefault()
  var DropArea = this
  var Texto = this.firstElementChild

  DropArea.classList.remove("active")
  Texto.textContent = "Arrastra y suelta la imagen"
}

var DropImagen = function(evento){
  evento.preventDefault();
  var files = evento.dataTransfer.files;
  showFiles(files[0], this);

  var DropArea = this;
  var Texto = this.firstElementChild;

  DropArea.classList.remove("active");
  Texto.textContent = "Arrastra y suelta la imagen";
}

actualizarListenersBotones();

function showFiles(file, DropArea){
    processFile(file, DropArea)
}

function processFile(file, DropArea){
  var docType = file.type;
  
  var validExtensions = ['image/jpeg', 'image/jpg', 'image/png']

  if (validExtensions.includes(docType)){
    var fileReader = new FileReader();

    fileReader.addEventListener('load', async e =>{
      var fileUrl = fileReader.result;
      var Image = document.createElement("img")

      Image.setAttribute("src", fileUrl)
      Image.setAttribute("alt", file.name)
      DropArea.replaceWith(Image)

      Elemento = Image.parentElement.parentElement
      deshabilitarBotones(Elemento)

      var response = await fetch('/InsertImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'imagen': fileUrl,
            'posicion': Elemento.getAttribute("id")
        })
      })
      const dataId = await response.json() 

      Image.setAttribute("id", dataId)
      
    })
  fileReader.readAsDataURL(file)
  }else{
    console.log('tipo de imagen no valida')
  }
}

function deshabilitarBotones(Elemento){
  BotonTitulo = Elemento.querySelector("#TargetaT")
  BotonParrafo = Elemento.querySelector("#TargetaP")

  BotonTitulo.setAttribute("style", "display:none")
  BotonParrafo.setAttribute("style", "display:none")
}

AgregarTargeta.addEventListener('click', e=>{

  //Se resetean las variables
  actualizarElementos()
  num_id = Elemento.length +1

  //Se crea la targeta
  var NuevaTargeta= document.createElement("div")
  NuevaTargeta.innerHTML = `
    <div id="view" class="view" style="font-size: 14pt;"></div>
      <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
        <div class="absolute2" >
        <div class="btn btnT botonTitulo" id="TargetaT"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
        <div class="btn btnT botonParrafo" id="TargetaP"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
        <div class="btn btnT botonImagen" id="TargetaI"><img src="../../static/img/imagen.png" alt="" id="fontImagen"></div> 
      </div>   
  `
  NuevaTargeta.setAttribute("class", "elemento")
  NuevaTargeta.setAttribute("id", num_id)
  Ctdr.append(NuevaTargeta)
  
  actualizarElementos()
  actualizarListenersBotones()

  if(!elementosVacios()){
    FondoTargetas.setAttribute("style", "")
  }
})

function actualizarElementos(){
  Elemento = document.querySelectorAll(".elemento")
  EditarTargeta = document.querySelectorAll(".view")
  
  BotonEliminar = document.querySelectorAll(".botonEliminar")
  BotonTitulo = document.querySelectorAll(".botonTitulo")
  BotonParrafo = document.querySelectorAll(".botonParrafo")
  BotonImagen = document.querySelectorAll(".botonImagen")
}

function elementosVacios(){
  return Elemento.length == 0
}

function actualizarListenersBotones(){

    BotonEliminar.forEach(Boton =>{
      Boton.addEventListener("click", EliminarTargeta);
    })

    BotonTitulo.forEach(Boton =>{
      Boton.addEventListener("click", TargetaTitulo)
    })

    BotonParrafo.forEach(Boton =>{
      Boton.addEventListener("click", TargetaParrafo)
    })

    BotonImagen.forEach(Elemento =>{
      Elemento.addEventListener("click", TargetaImagen)
    })

    EditarTargeta.forEach(Elemento =>{
      Elemento.addEventListener("dblclick", TargetaEditable)
    })

}

function editStart(fontSize, View) {
  var Area = document.createElement('textarea');
  var altura = View.clientHeight
  var ancho = View.clientWidth

  Area.className = 'edit';

  if(View.getAttribute("class") != "Imagen"){
    Area.value = View.innerText;
  }
  

  Area.setAttribute("style", `font-size: ` + fontSize + `pt; height:` + altura + `px; max-width:` + ancho + `px;`)
  View.replaceWith(Area);
  Area.focus();

  Area.onkeydown = function(event) {
    if (event.key == 'Enter') {
      this.blur();
    }
  };

  Area.onblur = function() {
    editEnd(fontSize, View, Area);
  };
}

function editEnd(fontSize, View, Area) {
  View.innerText = Area.value;
  View.setAttribute("style", "font-size:" + fontSize + "pt;")
  View.setAttribute("id", "view")
  View.setAttribute("class", "view")

  Area.replaceWith(View);
}

function dragDropStart(View){
  var DropArea = document.createElement("div")
  DropArea.setAttribute("class", "Imagen")

  DropArea.innerHTML = `
  <div class="drop-area">
    <h2 >Arrastra y suelta la imagen</h2>
    <span >O</span>
    <button >Selecciona tu imagen</button>
    <input type="file" name="" class="input-file" hidden>
  </div>
  `
  View.replaceWith(DropArea)

  variables()
}

function variables(){
  var DropArea = document.querySelectorAll(".drop-area")
  var DragText = document.querySelectorAll(".drop-area h2")
  var Button = document.querySelectorAll(".drop-area button")
  var Input = document.querySelectorAll(".drop-area .input-file")

  Button.forEach(Boton =>{
    Boton.addEventListener("click", SeleccionarArchivo)
  })

  Input.forEach(Elemento =>{
    Elemento.addEventListener("change", CargarArchivo)
  })

  DropArea.forEach(Elemento =>{
    Elemento.addEventListener("dragover", DragDentro)
    Elemento.addEventListener("dragleave", DragFuera)
    Elemento.addEventListener("drop", DropImagen)
  })
}


