const FormAddTitle = document.querySelector('#FTitulo')
const FormAddText = document.querySelector('#FTexto')

const userDiseño = document.querySelector('#Diseño')

const AddSummary = document.querySelector('#Publicar')

var DataPublico

const Publicarbtn = document.querySelector('#btnInput')

const Resumen_cnl = document.querySelector('.resumen-cnl')
const ResumenT = document.querySelector('#ResumenT')
const TextArea = document.querySelector('#Resumen')

//Cuando termine de cargarse la pagina se ejecutara este bloque
window.addEventListener("DOMContentLoaded", async () =>{

    //Buscamos la informacion completa del post con el id guardado en el documento
    const response = await fetch("/postRegistro/posts/"+document.querySelector('#id').textContent);
    const data = await response.json()

    //Cuando la pagina es nueva se manda un new, si ya ha sido modificada manda el id seleccionado
    if (data == "new"){
        //Desactiva el boton para publicar
        console.log("Pagina Nueva")
        Publicarbtn.setAttribute('disabled', 'true')
    }
    else{
        //Establece el id de la pagina
        IniPagina(data)
    }
    DataPublico = data
});

//Metodo que asigna el resumen para poder modificarlo
Publicarbtn.addEventListener('click', e =>{

    ResumenT.textContent = DataPublico[1]
    TextArea.value = DataPublico[2]

});

//Metodo para enviar el resumen y actualizarlo en la base de datos
AddSummary.addEventListener('click', async e =>{

    var response = await fetch('/postRegistro/resumen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: DataPublico[0],
            resumen: TextArea.value
        })
    })
    const data = await response.json()  

    

});

//
FormAddTitle.addEventListener('submit', async e =>{
    e.preventDefault()

    const userItem = document.createElement('li')
    const titulo = FormAddTitle['titulo'].value

    userItem.innerHTML = `<h1>${titulo}</h1>`
    userDiseño.append(userItem)

    const response = await mandarJson()
    const data = await response.json()

    DataPublico = data

    insertarId(data[0])
});

FormAddText.addEventListener('submit', async e =>{
    e.preventDefault()

    const userItem = document.createElement('li')
    const texto = FormAddText['texto'].value

    userItem.innerHTML = `<p>${texto}</p>`

    userDiseño.append(userItem)

    console.log(userDiseño.innerHTML)

    const response = await mandarJson()
    const data = await response.json()

    DataPublico= data

    insertarId(data[0])
});

function mandarJson() {

    //Titulo asegurado, nombre asegurado, id(numero o new)
    const tituloP = document.querySelector('#titulo').textContent
    const nombre = document.querySelector('#NombreUsuario').textContent
    const id = document.querySelector('#id').textContent

    var response = fetch('/postRegistro/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: tituloP,
            id,
            texto: userDiseño.innerHTML,
            nombre,
            fecha: '',
            hora: ''
        })
    })
    return response
}

function insertarId(id){
    document.querySelector('#id').textContent = id
    if (Publicarbtn.hasAttribute('disabled'))
        Publicarbtn.removeAttribute('disabled')
}

//Metodo que inserta dentro de la pagina el ID correspondiente al post
function IniPagina(data){

    document.querySelector('#Diseño').innerHTML= data[3]

}