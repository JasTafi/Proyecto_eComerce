if (document.title === "login") {
    const inputUsuario = document.getElementById("inputUsuario");
    const inputContraseña = document.getElementById("inputContraseña");
    const botonLogin = document.getElementById("botonLogin");
    const navBarAdministracion = document.getElementById("navBarAdministracion");
    const navBarLogin = document.getElementById("navBarLogin");
    const navBarRegistro = document.getElementById("navBarRegistro");
  
    const usuarioAdmin = "rollingperifericos@gmail.com";
    const contraseñaAdmin = "rolling123";
  
    let usuarios = [];
    if (localStorage.getItem("Usuario")) {
      usuarios = JSON.parse(localStorage.getItem("Usuario"));
    }
  
    let usuarioLogins = [];
    if (localStorage.getItem("usuarioLogins")) {
      usuarioLogins = JSON.parse(localStorage.getItem("usuarioLogins"));
    }
  
    class usuarioLogin {
      constructor(usuario, contraseña) {
        this.usuario = usuario;
        this.contraseña = contraseña;
      }
    }
  
    botonLogin.addEventListener("click", (e) => {
      const usuario = inputUsuario.value;
      const contraseña = inputContraseña.value;
  
      const usuarioExiste = usuarios.filter(
        (x) => x.email === usuario && x.password === contraseña
      );
  
      if (
        usuarioExiste[0] &&
        usuarioExiste[0].email == usuarioAdmin &&
        usuarioExiste[0].password == contraseñaAdmin
      ) {
        navBarLogin.className = "nav-link text-dark d-none";
        navBarRegistro.className = "nav-link text-dark d-none";
        navBarAdministracion.className = "nav-link text-dark d-block";
        navBarLogOut.className =
          "nav-link text-dark d-block rounded-3 btn btn-warning";
        usuarioLogins.push(usuarioExiste[0]);
        localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
        location.href = "/administracion.html";
      } else if (usuarioExiste[0]) {
        navBarLogin.className = "nav-link text-dark d-none";
        navBarRegistro.className = "nav-link text-dark d-none";
        navBarLogOut.className =
          "nav-link text-dark d-block rounded-3 btn btn-warning";
        usuarioLogins.push(usuarioExiste[0]);
        localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
        location.href = "/index.html";
      } else {
        alert("Usuario y/o contraseña no se encuentra en la base de datos.");
      }
    });
  
    navBarLogOut.addEventListener("click", () => {
      let respuesta = confirm("¿Seguro quiere cerrar sesion?");
      if (respuesta) {
        localStorage.removeItem("usuarioLogins");
        location.href = "/index.html";
      }
    });
  }

if (document.title === "Administracion") {
    const botonAgregar = document.getElementById("button-addon2")
    const inputNombre = document.getElementById("inputNombre")
    const inputCodigo = Date.now()
    const inputCategoria = document.getElementById("inputCategoria")
    const inputPrecio = document.getElementById("inputPrecio")
    const inputImagen = document.getElementById("inputImagen")
    const inputStock = document.getElementById("inputStock")
    const inputDescripcion = document.getElementById("inputDescripcion")

    let agregados = []
    if (localStorage.getItem("agregados")) {
        agregados = JSON.parse(localStorage.getItem("agregados"))
    }

    class producto {
        constructor(nombre, codigo, categoria, precio, imagen, stock, descripcion) {
            this.nombre = nombre
            this.codigo = codigo
            this.categoria = categoria
            this.precio = precio
            this.imagen = imagen
            this.stock = stock
            this.descripcion = descripcion
        }
    }

    botonAgregar.addEventListener("click",(e) => {
        location.reload();
        const nombre = inputNombre.value
        const codigo = inputCodigo
        const categoria = inputCategoria.value
        const precio = inputPrecio.value
        const imagen = inputImagen.value
        const stock = inputStock.value
        const descripcion = inputDescripcion.value
        const nuevoProducto = new producto (nombre, codigo, categoria, precio, imagen, stock, descripcion)
        agregados.push(nuevoProducto)
        form.reset()
        localStorage.setItem("agregados", JSON.stringify(agregados))
    })

    const myModal = document.querySelector("#myModal")
    const tbody = document.querySelector("#tablaProductos")
    
    agregados.forEach((producto) => {
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.codigo}</td>
            <td>${producto.categoria}</td>
            <td>$${producto.precio}</td>
            <td>$${producto.stock}</td>
            <td>${producto.descripcion}</td>
            <button id="${producto.nombre}" class="btn btn-warning" type="button" id="button-addon2">Eliminar</button>
        `
        tbody.appendChild(tableRow)
        tableRow.addEventListener("click", (e) => {
        myModal.style.display = "block"
        const productoClickeado = e.target.parentElement.children[1].innerText
        document.querySelector('#nombre').innerText = productoClickeado
        document
            .querySelector("#validarproducto")
            .addEventListener("click", (e) => {
                const nombre = document.querySelector("#inputNombre").value
                const categoria = document.querySelector("#inputCategoria").value
                const precio = document.querySelector("#inputPrecio").value
                const stock = document.querySelector("#inputStock").value
                const descripcion = document.querySelector("#inputDescripcion").value
                const nuevoProductoAMostrar = agregados.map((producto) => {
                if (producto.nombre === productoClickeado) {
                    producto.nombre = nombre
                    producto.categoria = categoria
                    producto.precio = precio
                    producto.stock = stock
                    producto.descripcion = descripcion
                }
                return producto
            })
            localStorage.setItem("agregados", JSON.stringify(nuevoProductoAMostrar))
            window.location.reload()
            })
        })
    })
    const botonesBorrar = document.querySelectorAll(".btn")
    botonesBorrar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
        e.stopPropagation()
        const sinProductoBorrado = agregados.filter((producto) => {
            return producto.nombre !== e.target.id
        })
        localStorage.setItem("agregados", JSON.stringify(sinProductoBorrado))
        window.location.reload()
        })
    })

    let usuarioss = []
    if (localStorage.getItem("Usuario")) {
        usuarioss = JSON.parse(localStorage.getItem("Usuario"))
    }

    const usersTemplate = (nombre, apellido, email, password1) => {
        return `<div class="d-flex flex-column pJustificado">
            <div class="text-warning fw-bold">
                <hr>
            </div>
            <p class="fw-bold m-1">Nombre: ${nombre}</p>
            <p class="fw-bold m-1">Apellido: ${apellido}</p>
            <p class="fw-bold m-1">Contraseña: ${password1}</p>
            <p class="fw-bold m-1">${email}</p>
            <button id="${email}" class="btn btn-warning" type="button" id="buttonUsuario">Eliminar</button>
        </div>`;
    };
    
    let userTemplate = "<div class='d-flex row'>";

    usuarioss.map((element) => {
        const { nombre, apellido, email, password } =
        element;
        userTemplate += usersTemplate(
        nombre,
        apellido,
        email,
        password,
        );
    });
    
    userTemplate += "</div>";
    
    divUsuarios.innerHTML = userTemplate;

}

if(document.title==="registro") {

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

}

if (document.title==="detalle de producto") {

    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get("id");
  
    let agregados = []
    if (localStorage.getItem("agregados")) {
        agregados = JSON.parse(localStorage.getItem("agregados"))
    }
    
    let productosEnCarrito = [];
    if (localStorage.getItem("productosEnCarrito")) {
      productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"));
    }
  
    const existeId = agregados.filter((x) => x.id == paramId);
  
    const divApp = document.querySelector("#tarjeta")
      
    const cardTemplate = (nombre, id, categoria, precio, imagen, stock, descripcion) => {
      return `<div class="m-5 d-flex justify-content-between">
                <div class="d-flex flex-column m-3">
                  <img src="${imagen}" class="m-3" alt="...">
                  <button class="rounded-3 btn btn-warning" id="agregarProductoCarro">Agregar al carrito</button>
                </div>
                <div class="col-1"></div>
                <div class="d-flex flex-column">
                  <h1 class="col-8 mx-2 my-4">${nombre}</h1>
                  <p class="m-2">Codigo unico del producto: ${id}</p>
                  <div class="text-warning fw-bold">
                    <hr>
                  </div>
                  <p class="fs-2 fw-bold">$ ${precio}</p>
                  <div class="m-2 d-flex">
                    <p class="fw-bold">Categoria:</p>
                    <p class="mx-2">${categoria}</p>
                  </div>
                  <div class="m-2 d-flex">
                    <p class="fw-bold">Stock disponible:</p>
                    <p class="mx-2">${stock}</p>
                  </div>
                  <div class="m-2 d-flex">
                    <p class="fw-bold">Descripcion de este producto:</p>
                    <p class="mx-2 pJustificado">${descripcion}</p>
                  </div>
                </div>
              </div>`;
    };
    
  
    let htmlTemplate = "<div class='d-flex row mx-2 justify-content-around'>";
    
    existeId.map((element) => {
      const { nombre, id, categoria, precio, imagen, stock, descripcion } =
        element;
      htmlTemplate += cardTemplate(
        nombre,
        id,
        categoria,
        precio,
        imagen,
        stock,
        descripcion,
      );
    });
    
    htmlTemplate += "</div>";
    
    divApp.innerHTML = htmlTemplate;
  
    if (agregarProductoCarro){ 
      agregarProductoCarro.addEventListener("click",() => {
        productosEnCarrito.push(existeId) 
        localStorage.setItem('productos', JSON.stringify(productosEnCarrito))
      }
      )}
  
  }
  