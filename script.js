import Carrito from "./carrito.js";

document.addEventListener("DOMContentLoaded", function (event) {
  // Inicializa la instancia del carrito aquí, a nivel superior
  const carrito = new Carrito();

  // Cargar productos desde la API
  fetch("https://jsonblob.com/api/1293866328606498816/")
    .then((response) => response.json())
    .then((prod) => {
      const productos = prod.products;
      cargarDatos(productos);
      console.log(productos);

      // Cargo os datos del json
      function cargarDatos(productos) {
        // Recorro el array y me creo una constante con cada uno de los elementos.
        // Como no tengo cantidad de inicio la pongo a 0
        productos.forEach((element) => {
          const products = {
            sku: element.SKU,
            title: element.title,
            price: element.price,
            cantidad: 0,
          };

          // Agrego cada producto al carrito
          carrito.agregarProducto(products);

          // Recojo los dos elementos del html
          const tablaProducts = document.getElementById("tablaProductos");
          const elementTbody = document.getElementById("cuerpoTabla");
          // Creo un tr por cada elemento "producto" del json
          const elementFila = document.createElement("tr");

          // Muestro el nombre
          const elementNombre = document.createElement("td");
          elementNombre.textContent = element.title;
          console.log(element.title);
          const parr = document.createElement("p");

          // Creo el subespacio SKU
          const miDiv = document.createElement("div");
          const modelo = document.createElement("p");
          modelo.textContent = "REF: " + element.SKU;
          console.log(element.SKU);
          miDiv.append(parr, modelo);

          // Inserto nombre y SKU
          elementNombre.appendChild(miDiv);

          // Creo la cantidad
          let cantidadBoton = 0;
          const filaCantidad = document.createElement("td");
          const cantidad = document.createElement("div");
          cantidad.className = "contador";

          // Creo los botones de cantidad y su funcionalidad decremento e incremento
          const decremento = document.createElement("button");
          decremento.textContent = "-";

          decremento.addEventListener("click", () => {
            if (cantidadBoton > 0) {
              cantidadBoton--;
              mostrarCantidad.textContent = cantidadBoton;
              carrito.actualizarUnidades(element.SKU, cantidadBoton);
              actualizarTotal();
              mostrarCarrito();
            }
          });

          //Creo un hueco para meter la cantidad segun pulse sobre el + o -
          const mostrarCantidad = document.createElement("span");
          mostrarCantidad.textContent = cantidadBoton;

          const incremento = document.createElement("button");
          incremento.textContent = "+";

          incremento.addEventListener("click", () => {
            cantidadBoton++;
            mostrarCantidad.textContent = cantidadBoton;
            carrito.actualizarUnidades(element.SKU, cantidadBoton);
            actualizarTotal();
            mostrarCarrito();
          });

          // Inserto los botones y cantidad
          cantidad.appendChild(decremento);
          cantidad.appendChild(mostrarCantidad);
          cantidad.appendChild(incremento);

          // Inserto cantidad en fila cantidad
          filaCantidad.appendChild(cantidad);

          // Muestro el precio por unidad
          const elementPrecio = document.createElement("td");
          elementPrecio.textContent = element.price + "€";

          // Muestro el precio total de cada fila
          const elementPrecioFila = document.createElement("td");

          // Fijo el total a 0 por defecto con dos decimales.
          elementPrecioFila.textContent = (0).toFixed(2) + "€";

          // Creo la funcion total por fila
          function actualizarTotal() {
            const precio = parseFloat(elementPrecio.textContent);
            const total = cantidadBoton * precio;
            elementPrecioFila.textContent = total.toFixed(2) + "€";
          }

          // Inserto los td
          elementFila.append(
            elementNombre,
            filaCantidad,
            elementPrecio,
            elementPrecioFila
          );

          // Inserto el tbody
          elementTbody.appendChild(elementFila);
        });

        //Llamo a la funcion mostrarCarrito
        mostrarCarrito();
      }

      //Creo funcion mostrarCarrito y recojo del html el id
      function mostrarCarrito() {
        const divElementos = document.getElementById("productosCarrito");
        // Dejo todo vacio
        divElementos.textContent = "";

        // Llamo a la funcion obtenerCarrito de la clase carrito
        const prodCarrito = carrito.obtenerCarrito();
        //Inicializo a 0 el total
        let totalCarrito = 0;

        // Recorro los productos de la cesta
        prodCarrito.productos.forEach((cesta) => {
          // Muestro el detalle de cantidad y nombre del articulo
          let descripcion = `${cesta.cantidad} x ${cesta.title}`;

          // Creo los elementos para insertar datos
          const elementos = document.createElement("div");
          const texto = document.createElement("span");
          const texto2 = document.createElement("span");

          texto.textContent = descripcion;
          // Añado los datos creados de mas abajo hacia arriba
          elementos.append(texto, texto2);
          divElementos.appendChild(elementos);

          // Incremento el total haciendo la multiplicacion
          totalCarrito += cesta.cantidad * cesta.price;
        });

        // Recojo del html el id para el totalFinal
        const spanTotalCarrito = document.getElementById("totalFinal");
        // Devuelvo el total.
        spanTotalCarrito.textContent = totalCarrito.toFixed(2) + "€";
      }
    });
});
