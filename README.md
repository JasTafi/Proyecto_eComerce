# Proyecto_eComerce
En este proyecto de e-comerce fue realizado los alumnos de la Comision 28I de la Academia RollingCode en forma grupal.
Participantes: Fernando Arroyo - Rodrigo Aragon - Gastón Monteiro - Gonzalo Velardez y José Sánchez.

El alcance de este proyecto realizar  odos los pasos del CRUD y mostrará los productos en
forma de un catálogo, también deberá realizarse el login del proyecto, se considera que solo el usuario
administrador podrá administrar los productos, mientras que los usuarios visitantes solo podrán ver las
publicaciones. Además hay requerimientos optativos como el registro de usuarios y poder armar una lista
de productos deseados por un usuario.
Este sitio es completamente responsive, utiliza Javascript 

La estructura general del sitio se compone de lo siguiente:

● Página Principal: Esta página contiene el catálogo de productos previamente cargados desde la
página de administración por el usuario administrador del sitio.
Contiene un filtro para buscar un producto por nombre o categoria.

● Página de administración: Aqui se muestra una tabla con los productos cargados, además de las opciones necesarias para agregar agregar, borrar y editar los mismos. (Aclaración: solo el administrador puede ver esta página) Tambien administra los usuarios ya registrados.

● Página de detalle: al seleccionar un producto, veremos una página con más detalles del mismo: 
-Código único del producto
-Nombre del producto
-Precio
-Categoria
-Cantidad de stock
-Descripcion del producto.
-Imagen del producto (Cargada con una url)

● Página acerca de nosotros: página que contiene información del equipo que desarrolló esta web, alguna frase que hable del equipo y debajo una galería con la foto de cada miembro del equipo, seguido por el nombre de cada uno.

● Página error 404: Pagina web con el error 404, que es llamada desde todos los botones o link de nuestro sitio que no tienen una funcionalidad establecida.

● Login: esta página con una ventana modal desde donde inicia el usuario administrador para iniciar sesion y tambien para los usuarios der mismo login servirá para usuarios registrados para comprar en el sitio.

● Pagina de Registro: Los datos que se solicitan son los siguientes campos: Nombre, Apellido, correo electrónico (el cual servirá para ingresar al sitio) y contraseña.

● Pagina que lista los productos deseados: Una vez logueado como usuario, podemos seleccionar los productos que
nos gusten e ir armando una lista de productos a comprar, esta lista es  visible en cualquier momento
por el usuario, el cual además podría eliminar un producto seleccionado.

● Usa Github para trabajar en forma colaborativa con el grupo: https://github.com/JasTafi/Proyecto_eComerce
● Panel de trello grupal: https//trello.com/b/wGJXWzkh/proyecto-javascript-2023
● Sitio en el servidor netlify: https://rollingperifericos.netlify.app
