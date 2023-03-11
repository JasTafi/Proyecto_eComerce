const botonRegistro = document.getElementById("button-addon2")
const inputNombre = document.getElementById("inputNombreU")
const inputApellido = document.getElementById("inputApellido")
const inputEmail = document.getElementById("inputEmail")
const inputPassword1 = document.getElementById("inputPassword1")
const inputPassword2 = document.getElementById("inputPassword2")

let usuarios = []
if (localStorage.getItem("Usuario")) {
    usuarios = JSON.parse(localStorage.getItem("Usuario"))
}

class Usuario {
    constructor( nombre, apellido, email, password1){
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.password = password1
    }
}

botonRegistro.addEventListener("click", (e) => {
    const nombre = inputNombre.value
    const apellido = inputApellido.value
    const email = inputEmail.value.toLowerCase()
    const password1 = inputPassword1.value
    const password2 = inputPassword2.value
    usuarios.map((usuario) => {
      if (usuario.email === email) {
        alert("El email ya se encuentra registrado.")
        return false
      };
    });
    if (password1 != password2) {
        alert("Las contraseñas no coinciden.")
        return false
    }
    const nuevoUsuario = new Usuario( nombre, apellido, email, password1)
    usuarios.push(nuevoUsuario)
    localStorage.setItem('Usuario', JSON.stringify(usuarios))
    alert("Gracias por registrarse")
    location.href ="/index.html";
  })