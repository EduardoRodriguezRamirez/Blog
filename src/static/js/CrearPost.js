const btnPublicar = document.querySelector("#btnPublicar")
var element 
var InnerHTMLPost
var titulo = document.getElementById("titulo")
const publicar = document.getElementById("Publicar")

publicar.addEventListener("click", async e=>{
    var response = await fetch('/PostExist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo.innerText,
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
                    GuardarPost(InnerHTMLPost, resumen)
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

async function GuardarPost(HTMLPost, Resumen){
    var response = await fetch('/postRegistro/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo.innerText,
            texto: HTMLPost,
            resumen: Resumen,
            nombre: '',
            fecha: '',
            hora: ''
        })
    })
    const data = await response.json()  
    console.log(data)
}
function ObtenerResumen(){
    var resumen = document.getElementById('Resumen').value
    return resumen
}