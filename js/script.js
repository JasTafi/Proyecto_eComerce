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
