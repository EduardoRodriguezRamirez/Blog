var imagen;
window.addEventListener('load', async e=>{

    if(imagen == undefined){
        const response = await fetch("/GetImage")
        const data = await response.json()
        console.log("Regreso los datos")

        if(data != ""){
            const icon = document.getElementById("IconoUsuario")
            icon.src = data[0]
            console.log("entro a la asignacion")
        }        
    }
})

