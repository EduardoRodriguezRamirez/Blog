
var Articulo = document.querySelector("#articulo")
var ElementoTitulo = document.getElementById("titulo")
var script 
var innerHTMLPost

try {
    var SwitchEditar = document.getElementById("EditSwitch")

    SwitchEditar.addEventListener("input", async e=>{
        if(SwitchEditar.checked){
            editarPost()
    
        }else{
            var ScriptRemover = document.getElementById("ScriptAñadido")
            var Edicion = document.getElementById("Edicion")
            var ContenedorHtml = document.getElementById("contenedorHtml")
            var titulo = ElementoTitulo.innerText
    
            ScriptRemover.remove()
            Edicion.remove()
            Articulo.setAttribute("style", "")
    
            const response = await fetch("/htmlPage/" + titulo)
            const dataPost = await response.json()
    
            ContenedorHtml.innerHTML = dataPost[0]
    
            var ElementoImagenes = document.querySelectorAll("#contenedorHtml img")
            ElementoImagenes.forEach(async Image =>{
                id = Image.getAttribute("id")
                const response = await fetch("/GetImage/" + id)
                const data = await response.json()
                Image.setAttribute("src", data[0])
            })
        }
        eventoListenerBotonGuardar()
    })
} catch (error) {
    console.log("No existe")
}


async function guardarEdicionPostBD(htmlPost){
    var titulo = ElementoTitulo.innerText

    var response = await fetch('/postRegistro/Edicion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'texto': htmlPost,
            'titulo': titulo
        })
    })
    const dataEdicion = await response.json()  
    return dataEdicion
}

function eventoListenerBotonGuardar(){
    var BtnGuardarEdicion = document.getElementById("btnGuardarEdit")

    if( BtnGuardarEdicion != null){
        BtnGuardarEdicion.addEventListener('click', e=>{
            var ElementosImagenes = document.querySelectorAll(".Imagen")

            ElementosImagenes.forEach(async Imagen =>{
                var Image = Imagen.firstElementChild
                Image.setAttribute("src", "")
            })        
          guardarEdicionPost()
        })
    }
}

function guardarEdicionPost (){
    var Elementos = document.querySelectorAll(".elemento")
    var tipo = ""
    var texto = ""
    innerHTMLPost = ""

    if (Elementos.length != 0){

        Elementos.forEach(Elemento =>{
            var View = Elemento.firstElementChild
            texto = View.innerText
            tipo = Elemento.getAttribute("class").replace("elemento ", "")
            if(tipo == "imagen"){
                obtenerImagen(View)
            }else{
                obtenerHTLMPost(texto, tipo)  
            }
        })

        if(innerHTMLPost.trim() != ""){
            respuesta = guardarEdicionPostBD(innerHTMLPost)  

        }else{
            console.log("NO HAY TEXTO QUE PUBLICAR")
        }
    } else{
        console.log("NO HAY TARGETAS DE LAS QUE SACAR TEXTO")
        }
}

function obtenerHTLMPost(texto, tipo){
    seccion = ""

    if(tipo == "parrafo"){
        seccion = `<li><p>`+ texto +`</p></li>`
    }else if(tipo == "titulo"){
        seccion = `<li><h1>`+ texto +`</h1></li>`
    }
    innerHTMLPost = innerHTMLPost + seccion
}

function editarPost(){
    var ElementosLi = document.querySelectorAll("article li")
    var BaseBody = document.querySelector("#contenedorBody")
    var BaseTargetas = document.createElement("div") 

    Articulo.setAttribute("style", "display:none")

    BaseTargetas.setAttribute("id", "Edicion")
    BaseTargetas.innerHTML= `
        <div class="container-lg  margen" id="cuerpoPost">
        <!--TARGETAS-->
            <div class="flex" id="BaseFondo">
                <div id="ctdr">
                </div>
            </div>
            <div class="btn" id="btnTargeta" >
                <img src="../../static/img/mas.png" alt=""  id="agregarT">
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <button class="btn btn-outline-dark" id="btnGuardarEdit">Guardar</button>
        </div>
        `
    BaseBody.prepend(BaseTargetas)

    insertarTargetas(ElementosLi)
    
    script = document.createElement("script")
    script.setAttribute("src", "/static/js/FuncionTargetas.js")
    script.setAttribute("id", "ScriptAñadido")

    BaseBody.append(script)
}

function insertarTargetas(ListaLi){
    var CtdrBtnEditar = document.querySelector("#ctdr")
    var id = 0

    ListaLi.forEach(elemento =>{
        var tipo = elemento.innerHTML.charAt(1).toLowerCase()
        var TargetaPersonal= document.createElement("div")
        var texto = elemento.innerText
        var font
        var clase
        
        id = id + 1
        if (tipo == "p"){
            font = "14"
            clase  = "parrafo"
            TargetaPersonal.innerHTML = `
            <div id="view" class="view" style="font-size: ` + font + `pt;">` + texto + `</div>
            <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
                <div class="absolute2" >
                <div class="btn btnT botonTitulo" id="TargetaT"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
                <div class="btn btnT botonParrafo" id="TargetaP"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
                <div class="btn btnT botonImagen" id="TargetaI" style="display:none"><img src="../../static/img/imagen.png" alt="" id="fontImagen"></div> 
            </div>   
        `

        }else if (tipo == "h"){
            font = "24"
            clase = "titulo"
            TargetaPersonal.innerHTML = `
            <div id="view" class="view" style="font-size: ` + font + `pt;">` + texto + `</div>
            <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
                <div class="absolute2" >
                <div class="btn btnT botonTitulo" id="TargetaT"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
                <div class="btn btnT botonParrafo" id="TargetaP"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
                <div class="btn btnT botonImagen" id="TargetaI" style="display:none"><img src="../../static/img/imagen.png" alt="" id="fontImagen"></div> 
            </div>   
        `
        }else {
            clase = "imagen"
            var imagenTargeta = 
            `<div class="Imagen">
            `+ elemento.innerHTML +`
            </div>
            <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
            <div class="absolute2">
                <div class="btn btnT botonTitulo" id="TargetaT" style="display:none"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
                <div class="btn btnT botonParrafo" id="TargetaP" style="display:none"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
                <div class="btn btnT botonImagen" id="TargetaI"><img src="../../static/img/imagen.png" alt="" id="fontImagen"></div> 
            </div>   `
            TargetaPersonal.innerHTML = imagenTargeta
        }
        

    TargetaPersonal.setAttribute("class", "elemento " + clase)
    TargetaPersonal.setAttribute("id", id)
    CtdrBtnEditar.append(TargetaPersonal)
    })
}

function obtenerImagen(View){
    var listaImagen = "<li>"+View.innerHTML+"</li>"

    innerHTMLPost = innerHTMLPost + listaImagen
}
