const BtnResumen = document.getElementById("addAbstract")
const BtnPublicar = document.getElementById("Publicar")
const BtnGuardarEdit = document.getElementById("save")

var Ctdr = document.getElementById("ctdr")
var ElementoTitulo = document.getElementById("titulo")
var elemento 
var innerHTMLPost =""
var EstadoEdit = document.getElementById("EstadoEdit")

window.addEventListener('DOMContentLoaded', async e=>{
    var titulo = ElementoTitulo.innerText
    const response = await fetch("/ValidateEdit/" + titulo)
    const dataEdit = await response.json()

    //Si los datos son nulos quiere decir que no hay registro de un edit anterior
    if (dataEdit == null){

        Ctdr.innerHTML = `
        <div class="elemento" id="1"> 
            <div id="view" class="view" style="font-size: 14pt;"></div>
            <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
            <div class="absolute2" >
                <div class="btn btnT botonTitulo" id="TargetaT"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
                <div class="btn btnT botonParrafo" id="TargetaP"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
                <div class="btn btnT botonImagen" id="TargetaI"><img src="../../static/img/imagen.png" alt="" id="fontImagen"></div> 
            </div>   
        </div>
    `   
        actualizarElementos()
        actualizarListenersBotones()
    }else{

        Ctdr.innerHTML = dataEdit[2]

        var ElementosImagenes = document.querySelectorAll(".Imagen")

        ElementosImagenes.forEach(async Imagen =>{
            var Image = Imagen.firstElementChild
            var id =Image.getAttribute("id")

            const response = await fetch("/GetImage/" + id)
            const data = await response.json()

            Image.setAttribute("src", data[0])
        })
        actualizarElementos()
        actualizarListenersBotones()
    }
})

BtnPublicar.addEventListener("click", async e=>{

    var titulo = ElementoTitulo.innerText

    var response = await fetch('/PostExist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'titulo': titulo,
        })
    })
    const newEdit = await response.json() 

    if(newEdit){
        var ElementosImagenes = document.querySelectorAll(".Imagen")

        ElementosImagenes.forEach(async Imagen =>{
            var Image = Imagen.firstElementChild
            Image.setAttribute("src", "")
        })
    
        var Elementos = document.querySelectorAll(".elemento")
        var tipo = ""

        if (Elementos.length != 0){
            Elementos.forEach(Elemento =>{
                var View = Elemento.firstElementChild
                texto = View.innerText
                tipo = Elemento.getAttribute("class").replace("elemento ", "")
                if(tipo == "imagen"){
                    obtenerImagen(View)
                }else{
                    obtenerHTMLPost(texto, tipo) 
                }
            })

            if(innerHTMLPost.trim() != ""){
                var resumen = obtenerResumen()

                if(resumen.trim() != ""){
                    var respuesta = await guardarPostBD(innerHTMLPost, resumen, titulo)
                    console.log(respuesta)
                    if (respuesta == "Done"){
                        Success("El post fue publicado exitosamente", EstadoEdit)
                    }else{
                        failure("Hubo un error a la hora de guardar el post", EstadoEdit)

                    }
                    
                    
                }else{
                    failure("Aun no has agregado un resumen", EstadoEdit)
                }
            }else{
                failure("Los campos estan vacios, por lo que no se pudo guardar", EstadoEdit)

            }
        } else{
            failure("No hay información que guardar", EstadoEdit)

        }
    }else{
        failure("Ya esta publicado este post", EstadoEdit)
    }
})

function failure(text, obj){
    obj.textContent = text
    obj.setAttribute("class", "form-text failure")
    obj.removeAttribute("style")
}
function Success(text, obj){
    obj.textContent = text
    obj.setAttribute("class", "form-text Success")
    obj.removeAttribute("style")
}

BtnGuardarEdit.addEventListener("click", e=>{
    guardarEdit()
})

async function guardarEdit(){
    var titulo = ElementoTitulo.innerText
    var ElementosImagenes = document.querySelectorAll(".Imagen")

    ElementosImagenes.forEach(async Imagen =>{
        var Image = Imagen.firstElementChild
        Image.setAttribute("src", "")
    })

    var htmlTargetas = Ctdr.innerHTML

    var response = await fetch('/SaveEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'titulo': titulo,
            'html': htmlTargetas
        })
    })
    const data = await response.json() 

    var mid2 = "/"

    window.location.href = mid2
}

async function guardarPostBD(htmlPost, resumen, titulo){
    var response = await fetch('/postRegistro/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo,
            texto: htmlPost,
            resumen: resumen,
            nombre: '',
            fecha: '',
            hora: ''
        })
    })
    const postRegistrado = await response.json()
    var respuesta = postRegistrado
    return respuesta
}

function obtenerHTMLPost(texto, tipo){
    seccion = ""

    if(tipo == "parrafo"){
        seccion = `<li><p>`+ texto +`</p></li>`
    }
    if(tipo == "titulo"){
        seccion = `<li><h1>`+ texto +`</h1></li>`
    }
    innerHTMLPost = innerHTMLPost + seccion
}

function obtenerImagen(View){
    var listaImagen = "<li>"+View.innerHTML+"</li>"

    innerHTMLPost = innerHTMLPost + listaImagen
}

function obtenerResumen(){
    var resumen = document.getElementById('Resumen').value
    return resumen
}

