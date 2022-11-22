const ButtonComment = document.querySelector('#BotonComentario');
const Title = document.querySelector('#titulo');

window.addEventListener("DOMContentLoaded", async e=>{
    var comentarios = document.querySelectorAll(".CommentUserName")
    comentarios.forEach(async Info =>{
        var fotoUser = Info.parentElement.parentElement.parentElement.firstElementChild.firstElementChild
        var nombre = Info.innerText.split("|")

        const response = await fetch("/ImageUser/" + nombre[0])
        const data = await response.json()

        console.log(data[0])
        if (data[0]){
            fotoUser.setAttribute("src", data[0])
        }
    })
    var ImgCurrentUser = document.querySelector(".AddComment .PicturePersonal img")
    
    const response = await fetch("/GetImage")
    const data = await response.json()

    if (data[0]){
        ImgCurrentUser.src = data
    }
})

ButtonComment.addEventListener('click', async ()=>{
    const CommentText = document.querySelector('#TextBoxComment');
    const Title = document.querySelector('#titulo');

    if (CommentText.value != ""){
        var response = await fetch('/User/CurrentUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'Comentario': CommentText.value,
                'post': Title.textContent
            })
        });
        const data = await response.json();
        CommentText.value = "";

        const CajaComentarios = document.querySelector(".Comment")
        const userItem = document.createElement("div")
        userItem.innerHTML = 
        `
            <div class="row PersonalComentary">
                <div class="col-2 PictureUser PicturePersonal">
                    <p>FOTO</p>
                </div>
                <div class="col-10 CommentInf">
                    <div class="row CommentUserInfo">
                        <div class="col-12 CommentUserName">${data['nombre']} | ${data['fecha']} ${data['hora']}</div>
                    </div>
                    <div class="row CommentText">
                        <p>${data['comentario']}</p>
                    </div>
                </div>
            </div>
         `
        CajaComentarios.prepend(userItem)    
    }
});