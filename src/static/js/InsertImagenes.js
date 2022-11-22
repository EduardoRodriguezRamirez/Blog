window.addEventListener("DOMContentLoaded", e =>{
    var ElementoImagenes = document.querySelectorAll("#contenedorHtml img")
    ElementoImagenes.forEach(async Image =>{
        id = Image.getAttribute("id")
        const response = await fetch("/GetImage/" + id)
        const data = await response.json()
        Image.setAttribute("src", data[0])
    })
})