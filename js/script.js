//#region index

if(document.title==="index") {

  //#region carrito de compra

  let productosEnCarrito = []
  if (localStorage.getItem("productosEnCarrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
  }

  const tbodyModal = document.querySelector("#tbodyModal")
  productosEnCarrito.forEach((producto) => {
    const tableModal = document.createElement("tr")
    tableModal.innerHTML = `
      <td class="px-2 text-center">${producto.nombre}</td>
      <td class="px-4 text-center">$ ${producto.precio}</td>
      <td class="px-2 text-center"><button id="${producto.nombre}" class="btn btn-secondary borrarModal bgLila btn-sm" type="button" id="button-addon2">Eliminar</button></td>
    `
    tbodyModal.appendChild(tableModal)
  })
  
  const botonesBorrar = document.querySelectorAll(".borrarModal")
  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const sinProductoBorrado = productosEnCarrito.filter((producto) => {
        return producto.nombre !== e.target.id
      })
      localStorage.setItem("productosEnCarrito", JSON.stringify(sinProductoBorrado))
      window.location.reload()
    })
  })

  //#endregion

//#region Usuario logueado en la pagina
const navBarAdministracion = document.getElementById("navBarAdministracion")
const navBarLogin = document.getElementById("navBarLogin")
const navBarRegistro = document.getElementById("navBarRegistro")
const tituloIndex = document.getElementById("tituloIndex")

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

    const usuario = usuarioLogins[0].email;
    const contraseña = usuarioLogins[0].contraseña;

    const usuarioExiste = usuarios.filter(
      (x) => x.email === usuario && x.contraseña === contraseña
    );

    if (
      usuarioExiste[0] &&
      usuarioExiste[0].email == usuarioAdmin &&
      usuarioExiste[0].password == contraseñaAdmin
    ) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarAdministracion.className = "nav-link text-white d-block";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      tituloIndex.className = "d-none"
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else if (usuarioExiste[0]) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      navBarCarrito.className = "nav-link text-white"
      tituloIndex.className = "d-none"
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else {
      alert("Usuario y/o contraseña no se encuentra en la base de datos.");
    }
  

  navBarLogOut.addEventListener("click", () => {
    let respuesta = confirm("¿Seguro quiere cerrar sesion?");
    if (respuesta) {
      localStorage.removeItem("usuarioLogins");
      location.href = "/login.html";
    }
  });

//#endregion

    let agregados = []
    if (localStorage.getItem("agregados")) {
        agregados = JSON.parse(localStorage.getItem("agregados"))
    }

    const divApp = document.getElementById("app");

    
    const cardTemplate = (nombre, precio, imagen, id) => {
      return `<div class="card m-2 col-lg-3 col-sm-5 col-12 border border-5">
          <img src="${imagen}" class="card-img-top" title="Imagen de ${nombre}" alt="Imagen de ${nombre}">
          <div class="card-body">
            <p class="card-text fw-bold">${nombre}</p>
            <div class="text-center aling-items-center d-flex justify-content-between">
                <span class="fw-bold fs-5 mt-1">$ ${precio}</span>
                <a href="detalleProducto.html?id=${id}" class="btn btn-secondary bgLila text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
                </a>
            </div>
          </div>
        </div>`;
    };
    
    let htmlTemplate = "<div class='d-flex row mx-2 justify-content-around'>";
    
    agregados.map((element) => {
        const { nombre, precio, imagen, id } =
          element;
        htmlTemplate += cardTemplate(
          nombre,
          precio,
          imagen,
          id,
        );
      });
    
    htmlTemplate += "</div>";
    
    divApp.innerHTML = htmlTemplate;


    const ulBuscar = document.querySelector("#ulBuscar")
    const buscador = document.querySelector("#buscador")
    const btnBuscar = document.querySelector("#btnBuscar")
    const btnBorrarFiltros = document.querySelector("#btnBorrarFiltros")
    const categoriaProd = agregados.map((prod) => {
      return prod.categoria
    })

    const categoriaFilter = categoriaProd.filter((valor, indice) => {
      return categoriaProd.indexOf(valor) === indice
    })

    categoriaFilter.forEach((producto) => {
      const liElemento = document.createElement("li")
      liElemento.innerHTML = `
        <li class="articulos list-group-item">${producto}</li>
      `
      ulBuscar.appendChild(liElemento)
    })

    buscador.addEventListener("click", (e) => {
      ulBuscar.style.display = "block"
    })
    document.addEventListener("keyup", (e) => {
      if (e.target.matches("#buscador")) {
        document.querySelectorAll(".articulos").forEach((catego) => {
          catego.textContent.toLocaleLowerCase().includes(e.target.value)
          ?catego.classList.remove("filtro")
          :catego.classList.add("filtro")
        })
        ulBuscar.addEventListener("click", (e) => {
          e.stopPropagation()
          buscador.value = e.target.innerHTML
          ulBuscar.style.display = "none"
        })
      }
    })

    btnBorrarFiltros.addEventListener("click", (e) => {
      window.location.reload()
    })

    btnBuscar.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productosBuscados = agregados.filter((producto) => {
        return producto.categoria == buscador.value
      })

      const divApp = document.getElementById("app");

      const cardTemplate = (nombre, precio, imagen, id) => {
        return `<div class="card m-2 col-lg-3 col-sm-5 col-12 border border-5">
            <img src="${imagen}" class="card-img-top" title="Imagen de ${nombre}" alt="Imagen de ${nombre}">
            <div class="card-body">
              <p class="card-text fw-bold">${nombre}</p>
              <div class="text-center aling-items-center d-flex justify-content-between">
                  <span class="fw-bold fs-5 mt-1">$ ${precio}</span>
                  <a href="detalleProducto.html?id=${id}" class="btn btn-secondary bgLila text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
                  </a>
              </div>
            </div>
          </div>`;
      };
      
      let htmlTemplate = "<div class='d-flex row mx-2 justify-content-around'>";
      
      productosBuscados.map((element) => {
          const { nombre, precio, imagen, id } =
            element;
          htmlTemplate += cardTemplate(
            nombre,
            precio,
            imagen,
            id,
          );
        });
      
      htmlTemplate += "</div>";
      
      divApp.innerHTML = htmlTemplate;

    })
}

//#endregion

//#region administracion

if(document.title==="administracion") {

const botonAgregar = document.getElementById("button-addon2")
const inputNombre = document.getElementById("inputNombre")
const inputId = Date.now()
const inputCategoria = document.getElementById("inputCategoria")
const inputPrecio = document.getElementById("inputPrecio")
const inputImagen = document.getElementById("inputImagen")
const inputStock = document.getElementById("inputStock")
const inputDescripcion = document.getElementById("inputDescripcion")

//#region Usuario logueado en la pagina
const navBarAdministracion = document.getElementById("navBarAdministracion")
const navBarLogin = document.getElementById("navBarLogin")
const navBarRegistro = document.getElementById("navBarRegistro")

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

    const usuario = usuarioLogins[0].email;
    const contraseña = usuarioLogins[0].contraseña;

    const usuarioExiste = usuarios.filter(
      (x) => x.email === usuario && x.contraseña === contraseña
    );

    if (
      usuarioExiste[0] &&
      usuarioExiste[0].email == usuarioAdmin &&
      usuarioExiste[0].password == contraseñaAdmin
    ) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarAdministracion.className = "nav-link text-white d-block";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else if (usuarioExiste[0]) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      navBarCarrito.className = "nav-link text-white"
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else {
      alert("Usuario y/o contraseña no se encuentra en la base de datos.");
    }
  

  navBarLogOut.addEventListener("click", () => {
    let respuesta = confirm("¿Seguro quiere cerrar sesion?");
    if (respuesta) {
      localStorage.removeItem("usuarioLogins");
      location.href = "/login.html";
    }
  });

//#endregion

let agregados = []
if (localStorage.getItem("agregados")) {
    agregados = JSON.parse(localStorage.getItem("agregados"))
}

class producto {
    constructor(nombre, id, categoria, precio, imagen, stock, descripcion) {
        this.nombre = nombre
        this.id = id
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
    const id = inputId
    const categoria = inputCategoria.value
    const precio = inputPrecio.value
    const imagen = inputImagen.value
    const stock = inputStock.value
    const descripcion = inputDescripcion.value
    const nuevoProducto = new producto (nombre, id, categoria, precio, imagen, stock, descripcion)
    agregados.push(nuevoProducto)
    form.reset()
    localStorage.setItem("agregados", JSON.stringify(agregados))
})

  const span = document.getElementsByClassName('close')[0]
  span.addEventListener('click', () => {
    myModal.style.display = 'none'
  })

  const myModal = document.querySelector("#myModal")
  const tbody = document.querySelector("#tablaProductos")
  
  agregados.forEach((producto) => {
    const tableRow = document.createElement("tr")
    tableRow.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.id}</td>
      <td>${producto.categoria}</td>
      <td>$${producto.precio}</td>
      <td>${producto.stock}</td>
      <td>${producto.descripcion}</td>
      <button id="${producto.nombre}" class="btn border border-3 bgLila m-1" type="button" id="button-addon2">Eliminar</button>
    `
    tbody.appendChild(tableRow)

    tableRow.addEventListener("click", (e) => {
      myModal.style.display = "block"
      const productoClickeado = e.target.parentElement.children[0].innerText
      console.log(productoClickeado)
      document.querySelector("#validarProductos").addEventListener("click", (e) => {
        const modalPrecio = document.querySelector("#modalPrecio").value
        const modalStock = document.querySelector("#modaltStock").value
        const modalDescripcion = document.querySelector("#modalDescripcion").value
        const nuevoProductoAMostrar = agregados.map((producto) => {
          if (producto.nombre === productoClickeado) {
            producto.precio = modalPrecio
            producto.stock = modalStock
            producto.descripcion = modalDescripcion
          }
          return producto
        })
        console.log(nuevoProductoAMostrar)
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
          <button id="${email}" class="btn border border-3 bgLila m-1" type="button" id="buttonUsuario">Eliminar</button>
      </div>`;
  };

  const tbodyUsuariosReg = document.querySelector("#tablaUsuariosReg")

  usuarioss.forEach((registro) => {
    const tableReg = document.createElement("tr")
    tableReg.innerHTML = `
      <td>${registro.nombre}</td>
      <td>${registro.apellido}</td>
      <td>${registro.password}</td>
      <td>${registro.email}</td>
      <button id="${registro.email}" class="btn border border-3 bgLila m-1 borrarReg" type="button" id="button-addon2">Eliminar</button>
    `
    tbodyUsuariosReg.appendChild(tableReg)
  })

  const borrarUsuarios = document.querySelectorAll(".borrarReg")
  borrarUsuarios.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation()
      const sinUsusarioEliminados = usuarioss.filter((registro) => { 
        return registro.email !== e.target.id
      })
      localStorage.setItem("Usuario", JSON.stringify(sinUsusarioEliminados))
      window.location.reload()
    })
  })
}

//#endregion

//#region registro

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
    for (const usuario of usuarios) {
      if (usuario.email === email) {
        alert("El email ya se encuentra registrado.");
        return false;
      }
    }
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

//#endregion

//#region login

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
        "nav-link text-white d-block rounded-3 btn bgLila";
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
      location.href = "/administracion.html";
    } else if (usuarioExiste[0]) {
      navBarLogin.className = "nav-link text-dark d-none";
      navBarRegistro.className = "nav-link text-dark d-none";
      navBarLogOut.className =
        "nav-link text-white d-block rounded-3 btn bgLila";
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

//#endregion

//#region acerca de nosotros

if(document.title==="nosotros") {

//#region Usuario logueado en la pagina
const navBarAdministracion = document.getElementById("navBarAdministracion")
const navBarLogin = document.getElementById("navBarLogin")
const navBarRegistro = document.getElementById("navBarRegistro")

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

    const usuario = usuarioLogins[0].email;
    const contraseña = usuarioLogins[0].contraseña;

    const usuarioExiste = usuarios.filter(
      (x) => x.email === usuario && x.contraseña === contraseña
    );

    if (
      usuarioExiste[0] &&
      usuarioExiste[0].email == usuarioAdmin &&
      usuarioExiste[0].password == contraseñaAdmin
    ) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarAdministracion.className = "nav-link text-white d-block";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else if (usuarioExiste[0]) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      navBarCarrito.className = "nav-link text-white"
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else {
      alert("Usuario y/o contraseña no se encuentra en la base de datos.");
    }
  

  navBarLogOut.addEventListener("click", () => {
    let respuesta = confirm("¿Seguro quiere cerrar sesion?");
    if (respuesta) {
      localStorage.removeItem("usuarioLogins");
      location.href = "/login.html";
    }
  });

//#endregion

let productosEnCarrito = []
  if (localStorage.getItem("productosEnCarrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
  }

  const tbodyModal = document.querySelector("#tbodyModal")
  productosEnCarrito.forEach((producto) => {
    const tableModal = document.createElement("tr")
    tableModal.innerHTML = `
      <td class="px-2 text-center">${producto.nombre}</td>
      <td class="px-4 text-center">$ ${producto.precio}</td>
      <td class="px-2 text-center"><button id="${producto.nombre}" class="btn btn-secondary bgLila btn-sm" type="button" id="button-addon2">Eliminar</button></td>
    `
    tbodyModal.appendChild(tableModal)
  })
  
  const botonesBorrar = document.querySelectorAll(".btn")
  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.stopPropagation()
      const sinProductoBorrado = productosEnCarrito.filter((producto) => {
        return producto.nombre !== e.target.id
      })
      localStorage.setItem("productosEnCarrito", JSON.stringify(sinProductoBorrado))
      window.location.reload()
    })
  })

}

//#endregion

//#region 404

if(document.title==="404") {

  //#region Usuario logueado en la pagina
  const navBarAdministracion = document.getElementById("navBarAdministracion")
  const navBarLogin = document.getElementById("navBarLogin")
  const navBarRegistro = document.getElementById("navBarRegistro")
  
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
  
      const usuario = usuarioLogins[0].email;
      const contraseña = usuarioLogins[0].contraseña;
  
      const usuarioExiste = usuarios.filter(
        (x) => x.email === usuario && x.contraseña === contraseña
      );
  
      if (
        usuarioExiste[0] &&
        usuarioExiste[0].email == usuarioAdmin &&
        usuarioExiste[0].password == contraseñaAdmin
      ) {
        navBarLogin.className = "nav-link text-white d-none";
        navBarRegistro.className = "nav-link text-white d-none";
        navBarAdministracion.className = "nav-link text-white d-block";
        navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
        usuarioLogins.push(usuarioExiste[0]);
        localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
      } else if (usuarioExiste[0]) {
        navBarLogin.className = "nav-link text-white d-none";
        navBarRegistro.className = "nav-link text-white d-none";
        navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
        navBarCarrito.className = "nav-link text-white"
        usuarioLogins.push(usuarioExiste[0]);
        localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
      } else {
        alert("Usuario y/o contraseña no se encuentra en la base de datos.");
      }
    
  
    navBarLogOut.addEventListener("click", () => {
      let respuesta = confirm("¿Seguro quiere cerrar sesion?");
      if (respuesta) {
        localStorage.removeItem("usuarioLogins");
        location.href = "/login.html";
      }
    });
  
  //#endregion
  
  let productosEnCarrito = []
    if (localStorage.getItem("productosEnCarrito")) {
      productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
    }
  
    const tbodyModal = document.querySelector("#tbodyModal")
    productosEnCarrito.forEach((producto) => {
      const tableModal = document.createElement("tr")
      tableModal.innerHTML = `
        <td class="px-2 text-center">${producto.nombre}</td>
        <td class="px-4 text-center">$ ${producto.precio}</td>
        <td class="px-2 text-center"><button id="${producto.nombre}" class="btn btn-secondary bgLila btn-sm" type="button" id="button-addon2">Eliminar</button></td>
      `
      tbodyModal.appendChild(tableModal)
    })
    
    const botonesBorrar = document.querySelectorAll(".btn")
    botonesBorrar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        e.stopPropagation()
        const sinProductoBorrado = productosEnCarrito.filter((producto) => {
          return producto.nombre !== e.target.id
        })
        localStorage.setItem("productosEnCarrito", JSON.stringify(sinProductoBorrado))
        window.location.reload()
      })
    })
  
  }

//#endregion

//#region detalle del producto

if (document.title==="detalle de producto") {

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get("id");
  
  
//#region Usuario logueado en la pagina
const navBarAdministracion = document.getElementById("navBarAdministracion")
const navBarLogin = document.getElementById("navBarLogin")
const navBarRegistro = document.getElementById("navBarRegistro")

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

    const usuario = usuarioLogins[0].email;
    const contraseña = usuarioLogins[0].contraseña;

    const usuarioExiste = usuarios.filter(
      (x) => x.email === usuario && x.contraseña === contraseña
    );

    if (
      usuarioExiste[0] &&
      usuarioExiste[0].email == usuarioAdmin &&
      usuarioExiste[0].password == contraseñaAdmin
    ) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarAdministracion.className = "nav-link text-white d-block";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else if (usuarioExiste[0]) {
      navBarLogin.className = "nav-link text-white d-none";
      navBarRegistro.className = "nav-link text-white d-none";
      navBarLogOut.className = "nav-link text-white d-block rounded-3 btn bgLila";
      navBarCarrito.className = "nav-link text-white"
      usuarioLogins.push(usuarioExiste[0]);
      localStorage.setItem("usuarioLogins", JSON.stringify(usuarioLogins));
    } else {
      alert("Usuario y/o contraseña no se encuentra en la base de datos.");
    }
  

  navBarLogOut.addEventListener("click", () => {
    let respuesta = confirm("¿Seguro quiere cerrar sesion?");
    if (respuesta) {
      localStorage.removeItem("usuarioLogins");
      location.href = "/login.html";
    }
  });

//#endregion

  let agregados = []
  if (localStorage.getItem("agregados")) {
      agregados = JSON.parse(localStorage.getItem("agregados"))
  }


  const existeId = agregados.filter((x) => x.id == paramId);

  const divApp = document.querySelector("#tarjeta")
    
  const cardTemplate = (nombre, id, categoria, precio, imagen, stock, descripcion) => {
    return `<div class="m-5 d-flex justify-content-between flex-column flex-lg-row">
              <div class="d-flex flex-column m-3">
                <img src="${imagen}" class="m-3" alt="...">
                <button class="rounded-3 btn btn-secondary bgLila text-white" id="agregarProductoCarro">Agregar al carrito</button>
              </div>
              <div class="col-1"></div>
              <div class="d-flex flex-column">
                <h1 class="col-8 mx-2 my-4">${nombre}</h1>
                <p class="m-2">Codigo unico del producto: ${id}</p>
                <div class="text-secondary fw-bold">
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
      productosEnCarrito.push(existeId[0])
      localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito))
    })
  }

  let productosEnCarrito = []
  if (localStorage.getItem("productosEnCarrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
  }

  const tbodyModal = document.querySelector("#tbodyModal")
  productosEnCarrito.forEach((producto) => {
    const tableModal = document.createElement("tr")
    tableModal.innerHTML = `
      <td class="px-2 text-center">${producto.nombre}</td>
      <td class="px-4 text-center">$ ${producto.precio}</td>
      <td class="px-2 text-center"><button id="${producto.nombre}" class="btn btn-secondary bgLila btn-sm" type="button" id="button-addon2">Eliminar</button></td>
    `
    tbodyModal.appendChild(tableModal)
  })
  
  const botonesBorrar = document.querySelectorAll(".btn")
  botonesBorrar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.stopPropagation()
      const sinProductoBorrado = productosEnCarrito.filter((producto) => {
        return producto.nombre !== e.target.id
      })
      localStorage.setItem("productosEnCarrito", JSON.stringify(sinProductoBorrado))
      window.location.reload()
    })
  })
    

}
//#endregion



