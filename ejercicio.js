
// llamamos a los nodos del DOM 
const products = document.querySelector('#productos')
const finish = document.getElementById('finalizar ')

// llamamos los productos de la API
const functionApi = async () => {
  const productsApi = await fetch('https://fakestoreapi.com/products') // buscamos la API
  const JSON = productsApi.json() //aplicamos el json para que nos devuelva los valores delo bjeto reales
  //console.log(JSON)
  return (JSON)
}
//functionApi()

// mostramos los productos de la API en la web 
const mostrarApi = async () => {
  const guardar = await functionApi() // guardamos la funcion de la API
  guardar.forEach(prod => {
    const { id, title, price, category, image } = prod // destructuramos el objeto para ingresarlo en la car 
    products.innerHTML += ` 
    <div class="card">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${category} ${price}</p>
    <button id=${id} onclick="addProduct('${id}')">Agregar</button>
    <button id=${id} onclick="removeProduct('${id}')">Eliminar</button>

  </div>
</div>`

  })
}
mostrarApi() // ejecutamos la funcion

//llamamo a la Api de un solo producto para poder ingresar luego los porductos al carrito 
const productApi = async (id) => { // pasamos a la funcion como parametro el id 
  const product = await fetch(`https://fakestoreapi.com/products/${id}`) // buscamos el id de cada producto de la Api
  const productJSON = product.json() // aplicamos el json para que nos devuelva el valor del objeto correcto
  return productJSON // nos devuelve el resultado
}

let cart = [] // creamos un array vacio 

const addProduct = async (id) => { // creamos una funcion asyncrona con un parametro id
  const guardarApi = await productApi(id) // guardamos la funcion de la Api en un variable
  const searchtProducts = cart.find(prod => prod.id === guardarApi.id) // recorremos los elementos y comparamos el id
  if (!searchtProducts) { // si los id son diferentes 
    cart.push({ // lo agregamos al carrito con las propiedades 
      id: guardarApi.id,
      title: guardarApi.title,
      category: guardarApi.category,
      price: guardarApi.price,
      quantity: 1,

    })
  } else { // en caso contrario
    searchtProducts.quantity++ // le sumamos 1 al producto
  }
  console.log(cart)
}


// eliminar producto del carrito 
const removeProduct = (id) => {
  const searchtProducts = cart.find((prod) => prod.id === id)
  if (!searchtProducts) {
    alert('no hay nada en carrito')
  } else {
    if (searchtProducts.quantity === 1) {
      cart = cart.filter((prod) => prod.id !== id)
    } else {
      searchtProducts.quantity--
    }
  }
  console.log(cart)
}











