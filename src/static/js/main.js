const userFormTitle = document.querySelector('#FTitulo')

const userDiseño = document.querySelector('#Diseño')

const Publicar = document.querySelector('#Publicar')

var DataPublico

const inputbtn = document.querySelector('#btnInput')

inputbtn.addEventListener('click', e =>{
    const ResumenT = document.querySelector('#ResumenT')

    const TextArea = document.querySelector('#Resumen')

    ResumenT.innerHTML = DataPublico[1]
    TextArea.innerHTML = DataPublico[2]
});

Publicar.addEventListener('click', async e =>{
    const resumen = document.querySelector('#Resumen')

    var response = await fetch('/postRegistro/resumen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: DataPublico[0],
            resumen: resumen.value
        })
    })

    const data = await response.json()  
});

window.addEventListener("DOMContentLoaded", async () =>{

    const response = await fetch("/postRegistro/posts/"+document.querySelector('#id').textContent);
    const data = await response.json()

    //Impresion de la data
    console.log(data)
    if (data == "new"){
        console.log("Pagina Nueva")
        inputbtn.setAttribute('disabled', 'true')
    }
    else{
        IniPagina(data)
        DataPublico = data
    }
});

function IniPagina(data){
    document.querySelector('#Diseño').innerHTML= data[3]
}

userFormTitle.addEventListener('submit', async e =>{
    e.preventDefault()

    const userItem = document.createElement('li')
    
    const titulo = userFormTitle['titulo'].value

    userItem.innerHTML = `<h1>${titulo}</h1>`
    userDiseño.append(userItem)

    const response = await mandarJson()
    const data = await response.json()

    DataPublico= data

    insertarId(data[0])
});

const userFormText = document.querySelector('#FTexto')

userFormText.addEventListener('submit', async e =>{
    e.preventDefault()

    const userItem = document.createElement('li')
    
    const texto = userFormText['texto'].value

    userItem.innerHTML = `<p>${texto}</p>`

    userDiseño.append(userItem)

    console.log(userDiseño.innerHTML)

    const response = await mandarJson()
    const data = await response.json()

    DataPublico= data

    insertarId(data[0])
});

function mandarJson() {

    const ResumenT = document.querySelector('#ResumenT')

    const TextArea = document.querySelector('#Resumen')

    const tituloP = document.querySelector('#titulo').textContent

    ResumenT.innerHTML = tituloP.innerHTML
    ResumenT.innerHTML = DataPublico[1]
    TextArea.innerHTML = DataPublico[2]
    
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
}
