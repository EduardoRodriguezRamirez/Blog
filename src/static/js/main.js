const userFormTitle = document.querySelector('#FTitulo')

const userDiseño = document.querySelector('#Diseño')

window.addEventListener("DOMContentLoaded", async () =>{
    const response = await fetch("/postRegistro/posts/"+document.querySelector('#id').textContent);
    const data = await response.json()
});

userFormTitle.addEventListener('submit', async e =>{
    e.preventDefault()

    const userItem = document.createElement('li')
    
    const titulo = userFormTitle['titulo'].value

    userItem.innerHTML = `<h1>${titulo}</h1>`
    userDiseño.append(userItem)

    console.log(userDiseño)

    const data = await mandarJson()

    console.log(data)
});

const userFormText = document.querySelector('#FTexto')

userFormText.addEventListener('submit', async e =>{
    e.preventDefault()

    const userItem = document.createElement('li')
    
    const texto = userFormText['texto'].value

    userItem.innerHTML = `<p>${texto}</p>`

    userDiseño.append(userItem)

    console.log(userDiseño.innerHTML)

    const data = await mandarJson()

    console.log(data)
});

function mandarJson() {
    const tituloP = document.querySelector('#titulo').textContent
    var titulo = document.querySelector('#titlemain').value

    if (tituloP != titulo){ 
        document.querySelector('#titulo').textContent = titulo
    }else{
        titulo = null
    }
    
    const nombre = document.querySelector('#NombreUsuario').textContent
    const id = document.querySelector('#id').textContent

    return fetch('/postRegistro/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo,
            id,
            resumen: '',
            texto: userDiseño.innerHTML,
            nombre,
            fecha: '',
            hora: ''
        })
    })
}
