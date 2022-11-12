const searchInput = document.getElementById("textPostSearch")

const searchBtn = document.getElementById("ButtonSearchPost")

const dropdown = document.getElementById("dropSuggest")

const dropBlur = document.getElementById("dropBlur")

window.addEventListener('DOMContenLoaded', e=>{
    var url = document.querySelectorAll('.url');
    var titulo = document.querySelectorAll('.title_useful');
    var i;
    for (i = 0; i < url.length; i++) {
        url[i].setAttribute('href', "/posts/"+titulo[i].textContent)
    }
})

searchInput.addEventListener('input', async e=>{
    const response = await fetch("/GetPosts");
    const data = await response.json()

    var busqueda =searchInput.value.toLowerCase();
    var size= busqueda.length;
    var half = size /2;

    var primera = busqueda.slice(0, half).toLowerCase();
    var segunda = busqueda.slice(half, size).toLowerCase();

    var array1 = []
    var array2 = []

    for(var i = 0 ; i<data.length ; i++){
        var nombre = data[i][0].toLowerCase();
        if( nombre.includes(primera.toLowerCase()) || 
            nombre.includes(segunda.toLowerCase())
        ){
            if (nombre.includes(busqueda)){
                array1.push(data[i][0])
            }else{
                array2.push(data[i][0])
            }
        }
    }
    for(var i = 0 ; i<array2.length ; i++){
       array1.push(array2[i])
    }
    Sugerencia(array1)
    /*var pivote = array1[0];
    for(var i = 1 ; i<array1.length ; i++){
        if(array1[i].length < pivote.length){
            pivote = array1[i]
        }
    }
    console.log("Mas aceptableeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(pivote)*/
})

async function Sugerencia(array){
    if(array!=""){
        var Num_suggest = 4
        var new_array = [];
    if (array.length<Num_suggest){
        Num_suggest=array.length;
    }
    for (var i = 0; i<Num_suggest; i++){
        new_array.push(array[i])
    }
    var response = await fetch('/GetAuthor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'array':new_array
        })
    });
    const data = await response.json()
    var listaInner ="";
    for(var i=0;i<new_array.length;i++){
        listaInner = listaInner + `
        <div class='borde-light'>
            <a href='/posts/`+new_array[i]+`'>
                <div class="titleP"><b>`+ new_array[i]+ `</b></div>
                <hr>
                <div class="authorNP d-flex"><i>Autor: `+ data[i][0]+ `</i></div>
            </a>
        </div>`
    }
    dropdown.innerHTML = listaInner;
    dropdown.setAttribute("style","display:block");
    }else{
        var listaInner = `
        <div class='borde-light d-flex justify-content-center'>
            <div class="titleNC">No hay coincidencias</div>
        </div>`
        dropdown.innerHTML = listaInner
    }
}

document.addEventListener("mouseup", function(event) {
    if (!dropBlur.contains(event.target)) {
        dropdown.removeAttribute("style")
    }
});

searchBtn.addEventListener('click', e=>{
    buscar()
})

searchInput.addEventListener('keypress', e=>{
    var codigo = e.which || e.keyCode;
     
    if(codigo === 13){
      buscar()
    }
})

function buscar(){
    if(searchInput.value!=""){
        var mid2 = "/Busqueda/"+searchInput.value
        window.location.href = mid2
    }
}
