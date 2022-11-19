const btnPublicar = document.querySelector("#btnPublicar")
var element 
var InnerHTMLPost
var titulo = document.getElementById("titulo")
const publicar = document.getElementById("Publicar")
var ctdr2 = document.getElementById("ctdr")

const btnSave = document.getElementById("save")

window.addEventListener('DOMContentLoaded', async e=>{
    const response = await fetch("/ValidateEdit/"+titulo.innerText)
    const data = await response.json()

    console.log("Valor: "+data)
    if (data == null){
        ctdr2.innerHTML = `
        <div class="elemento" id="1"> 
            <div id="view" class="view" style="font-size: 12pt;"></div>
            <div class="absolute btn btnT botonEliminar"><img src="../../static/img/cancelar.png" alt="" id="cancelar"></div>
            <div class="absolute2" >
                <div class="btn btnT botonTitulo" id="TargetaT"><img src="../../static/img/titulo.png" alt="" id="fontTitulo"></div>
                <div class="btn btnT botonParrafo" id="TargetaP"><img src="../../static/img/fuente.png" alt="" id="fontTexto"></div>
            </div>   
            <div class="absolute3 btn btnT">BtnI</div>  
        </div>
    `   
        actuar()
        EscBotones()
    }else{
        ctdr2.innerHTML = data[2]
        actuar()
        EscBotones()
    }

})

publicar.addEventListener("click", async e=>{

    title = titulo.innerText

    var response = await fetch('/PostExist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: title,
        })
    })
    const data = await response.json() 

    if(data){

        element = document.querySelectorAll(".view")
        Tipo = ""
        InnerHTMLPost = ""

        if (element.length != 0){

            element.forEach(elemento =>{

                texto = elemento.innerText
                Tipo = elemento.parentElement.getAttribute("class").replace("elemento ", "")
                arrayHtml(texto, Tipo)  

            })
            if(InnerHTMLPost.trim() != ""){
            
                var resumen = ObtenerResumen()

                if(resumen.trim() != ""){

                    respuesta = GuardarPost(InnerHTMLPost, resumen, title)
                    console.log(respuesta)
                    
                }else{
                    console.log("NO HAY RESUMEN QUE PUBLICAR")
                }
            }else{
                console.log("NO HAY TEXTO QUE PUBLICAR")
            }
        } else{
            console.log("NO HAY TARGETAS DE LAS QUE SACAR TEXTO")
        }
    }else{
        console.log("YA ESTA PUBLICADO")
    }
})

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

async function GuardarPost(HTMLPost, Resumen, title){
    var response = await fetch('/postRegistro/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: title,
            texto: HTMLPost,
            resumen: Resumen,
            nombre: '',
            fecha: '',
            hora: ''
        })
    })
    const data = await response.json()  
    return data
}
function ObtenerResumen(){
    var resumen = document.getElementById('Resumen').value
    return resumen
}

btnSave.addEventListener("click", e=>{
    save()
})


async function save(){
    var title = titulo.innerText
    ctdr2 = document.getElementById("ctdr")

    var response = await fetch('/SaveEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: title,
            html: ctdr2.innerHTML
        })
    })
    const data = await response.json() 
}