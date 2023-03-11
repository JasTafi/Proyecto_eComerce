if(document.tittle="Index") {
    let itemDetalle= [{
        imagen:"https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR7QUd3U1NaPfppDhehB9-FencWUb4fu_aRNa3IhaqagYMpZYni3s1ViFYDtjgPUWJ_B09Fxg76eg&usqp=CAc",
        nombre:"teclado", 
        precio:"12000",
        id: "1"
    }]
    const cuerpoModal = document.querySelector("#cuerpoModal")
    itemDetalle.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("estiloModal")
        div.innerHTML=`
        <img src="${item.imagen}" alt="">
        <p>${item.nombre}</p>
        <p>${item.precio}</p>
        <button class="btn btn-warning" id="${item.id}">eliminar</button>
        `
        cuerpoModal.appendChild(div)
    })
    const botonesEliminar = document.querySelectorAll("btn")
    botonesEliminar.forEach((boton => {
        boton.addEventListener("click", (e) => {
            e.stopPropagation()
            console.log(e.target)
        })
    }))
}
if(document.title=="Login"){
    const inputUsuario = document.getElementById("inputUsuario")
    const inputContraseña = document.getElementById("inputContraseña")
    const botonLogin = document.getElementById("botonLogin")

    let usuarioAdmin = "rollingperifericos@gmail.com"
    let contraseñaAdmin = "rolling123"

    let usuariosRegistrados = []
    if (localStorage.getItem("usuarioLogin")) {
    usuariosRegistrados = JSON.parse(localStorage.getItem("usuarioLogin"))
    }

    class usuarioLogin {
    constructor( usuario, contraseña){
        this.usaurio = usuario
        this.contraseña = contraseña
    }
    }

    botonLogin.addEventListener("click", (e) => {
    const usuario = inputUsuario.value
    const contraseña = inputContraseña.value
    const nuevoUsuarioRegistrado = new usuarioLogin( usuario, contraseña )
    usuariosRegistrados.push(nuevoUsuarioRegistrado)
    localStorage.setItem('usuarioLogin', JSON.stringify(usuariosRegistrados))
    if (usuario === usuarioAdmin && contraseña === contraseñaAdmin) {
        location.href ="/html/administracion.html";
    } else {
        alert("Usuario y/o contraseña incorrecto.")
    }
    })
}