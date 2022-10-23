const ButtonComment = document.querySelector('#BotonComentario');
const Title = document.querySelector('#titulo');

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
        console.log(data)

        data[0]

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