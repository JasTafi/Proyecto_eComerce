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
        alert("Usuario y/o contraseña incorrecto.")//agregar cuadro de notificacion
    }
    })
}