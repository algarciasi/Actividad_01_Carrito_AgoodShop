export default class Carrito {
  #productos;

  // Me creo el constructo vacio
  constructor() {
    this.#productos = [];
  }

  actualizarUnidades(sku, cantidad) {
    // Creo una constante para buscar el producto que coincida con su "modelo"
    const producto = this.#productos.find((prod) => prod.sku === sku);
    // Si lo encuentro actualizo la cantidad.
    if (producto) {
      producto.cantidad = cantidad;
    }
  }

  obtenerInformacionProducto(sku) {
    // Creo una constante para buscar el producto que coincida con su "modelo"
    const producto = this.#productos.find((prod) => prod.sku === sku);
    // Si lo encuentro devuelvo un objeto para luego acceder a el
    if (producto) {
      return { SKU: producto.sku, Cantidad: producto.cantidad };
    }
  }

  agregarProducto(producto) {
    // Sino esta el producto lo añado
    if (!this.#productos.find((prod) => prod.sku === producto.sku)) {
      this.#productos.push(producto);
    }
  }

  obtenerCarrito() {
    // Creo una variable total inicializada a 0
    let total = 0;
    //Recorro el array con los productos que se han añadido y voy multiplicando la cantidad por el precio.
    this.#productos.forEach((prod) => {
      total += prod.price * prod.cantidad;
    });
    // Devuelvo un objeto con el total de todos los productos.
    return {
      total: total.toFixed(2) + "€",

      // Mapeo los productos del array.
      productos: this.#productos.map((prod) => ({
        sku: prod.sku,
        title: prod.title,
        cantidad: prod.cantidad,
        price: prod.price,
      })),
    };
  }
}
