const btnEditar = document.querySelector("#btnEditarPost")
const switchEditar = document.getElementById("EditSwitch")

var titulo = document.getElementById("titulo")
var script 
var entraScript = true

var InnerHTMLPost

function btnSaveEdit(){
    var btnGuardarEdicion = document.getElementById("btnGuardarEdit")
    if( btnGuardarEdicion != null){
        btnGuardarEdicion.addEventListener('click', e=>{
          GuardarEdicionPost()
        })
    }
}


function GuardarEdicionPost (){
    
    var element = document.querySelectorAll(".view")
    var Tipo = ""
    InnerHTMLPost = ""

    if (element.length != 0){

        element.forEach(elemento =>{

            texto = elemento.innerText
            Tipo = elemento.parentElement.getAttribute("class").replace("elemento ", "")
            arrayHtml(texto, Tipo)  

        })

        if(InnerHTMLPost.trim() != ""){

            console.log(InnerHTMLPost)
            respuesta = GuardarPost(InnerHTMLPost)
            console.log(respuesta)
                   
        }else{
            console.log("NO HAY TEXTO QUE PUBLICAR")
        }
    } else{
        console.log("NO HAY TARGETAS DE LAS QUE SACAR TEXTO")
        }
}

function arrayHtml(texto, tipo){
    seccion = ""

    if(tipo == "parrafo"){
        seccion = `<li><p>`+ texto +`</p></li>`
    }
    if(tipo == "titulo"){
        seccion = `<li><h1>`+ texto +`</h1></li>`
    }
    InnerHTMLPost = InnerHTMLPost + seccion
}

async function GuardarPost(HTMLPost){
    var response = await fetch('/postRegistro/Edicion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            texto: HTMLPost,
            titulo: titulo.innerText
        })
    })
    const data = await response.json()  
    return data
}

switchEditar.addEventListener("input",async e=>{
    if(switchEditar.checked){
        editar()
    }else{
        var scriptRemover = document.getElementById("ScriptAñadido")
        scriptRemover.remove()
        
        var edicion = document.getElementById("Edicion")
        edicion.remove()
        articulo.setAttribute("style", "")

        var contenedorHtml = document.getElementById("contenedorHtml")
        const response = await fetch("/htmlPage/"+titulo.innerText)
        const data = await response.json()

        contenedorHtml.innerHTML = data[0]
    

    }
    btnSaveEdit()
})

function editar(){

    var articulo = document.querySelector("#articulo")

    articulo.setAttribute("style", "display:none")

    var Base = document.querySelectorAll("article li")
    var id = 0

    var baseBody = document.querySelector("#contenedorBody")

    var b = document.createElement("div") 
    b.setAttribute("id", "Edicion")
    b.innerHTML= `
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

    baseBody.prepend(b)

    var ctdrBtnEditar = document.querySelector("#ctdr")
    Base.forEach(elemento =>{
        ele = elemento.innerHTML.charAt(1).toLowerCase()
        
        var a= document.createElement("div")

        var font
        var clase
        
        id = id + 1
        if (ele == "p"){
            font = "14"
            clase  = "parrafo"

        }

        if (ele == "h"){
            font = 24
            clase = "titulo"
        }

        a.innerHTML = `
        <div id="view" class="view" style="font-size: `+font+`pt;">`+elemento.innerText+`</div>
        <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
            <div class="absolute2" >
            <div class="btn btnT botonTitulo" id="TargetaT"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
            <div class="btn btnT botonParrafo" id="TargetaP"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
        </div>   
        <div class="absolute3 btn btnT">BtnI</div> 
    `
    a.setAttribute("class", "elemento "+clase)
    //Se establece el id de la targeta
    a.setAttribute("id", id)
    //Se agrega al html
    ctdrBtnEditar.append(a)

    })
        entraScript = false
        script = document.createElement("script")
        script.setAttribute("src", "/static/js/EditPostScripts.js")
        script.setAttribute("id", "ScriptAñadido")
        baseBody.append(script)
    
}