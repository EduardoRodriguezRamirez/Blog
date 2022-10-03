const userFormTitle = document.querySelector('#FTitulo')

const userDiseño = document.querySelector('#Diseño')

const corredor = document.querySelector('#corredores')

corredor.addEventListener('click', e =>{
    var med = prompt("Nombre del post", "Videojuegos")
    var mid2 = "/postRegistro/crear/"+med
    window.location.href = mid2
});

window.addEventListener("DOMContentLoaded", async () =>{
    const response = await fetch("/postRegistro/posts/"+document.querySelector('#id').textContent);
    const data = await response.json()
    //Impresion de la data
    console.log(data)
    if (data == "new")
        console.log("entro")
    else
        IniPagina(data)
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

    console.log(data)
    console.log(data[0])
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

    console.log(data)
    console.log(data[0])
    insertarId(data[0])
});

function mandarJson() {
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
            resumen: '',
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
    console.log(id)
}
