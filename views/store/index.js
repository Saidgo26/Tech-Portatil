const list = document.querySelector('#listProducts');
const sectionCart = document.querySelector('#section-cart');
const navBtnStore = document.querySelector('#nav-btn-store');
const addBtn = document.querySelector("#add-btn");
const table = document.querySelector("#table-body");
const btnClear = document.querySelector("#table-clear");
const buyButton = document.querySelector('#buy-button');
const totalPriceCart = document.querySelector('#total-price-cart');
const totalQuantityCart = document.querySelector('#total-quantity-cart');
const listPurchases = document.querySelector('#listPurchases');

let cartItems = []; // Array para mantener los productos en el carrito

const updateCartTotal = () => {
    let total = 0;
    let quantity = 0;

    cartItems.forEach(item => {
        total += item.productPrice * item.quantity;
        quantity += item.quantity;
    });

    totalPriceCart.textContent = total.toFixed(2);
    totalQuantityCart.textContent = quantity;
};

const cleanCartContent = () => {
  table.innerHTML= '';
};

const buyProducts = async () => {
  try {
      if (cartItems.length === 0) {
          Swal.fire("El carrito está vacío. Agrega productos antes de comprar.");
          return;
      }

      // Crear un array de productos en el formato esperado por el esquema
      const purchaseProducts = cartItems.map(item => ({
          product: item.productId,
          quantity: item.quantity
      }));

      // Realizar la compra con los productos en el carrito
      const {data} = await axios.post('/api/purchases', {
          products: purchaseProducts,
          totalPrice: parseFloat(totalPriceCart.textContent)
      });
      console.log(data);
      console.log(purchaseProducts);

      // Limpiar el carrito después de realizar la compra
      cartItems = [];
      cleanCartContent();
      updateCartTotal();

      Swal.fire("Compra Realizada!!!");
  } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Error al realizar la compra');
  }
};

const addProductToCart = (btn, productId, productName, productPrice, productQuantity) => {
  btn.addEventListener('click', () => {
      // Verificar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.productId === productId);

      if (existingItem) {
          // Verificar si hay suficientes productos disponibles
          if (existingItem.quantity + 1 > productQuantity) {
              alert('No hay suficientes productos disponibles');
              return;
          }

          // Incrementar la cantidad si el producto ya está en el carrito
          existingItem.quantity++;
      } else {
          // Verificar si hay suficientes productos disponibles
          if (1 > productQuantity) {
              alert('No hay suficientes productos disponibles');
              return;
          }

          // Agregar el producto al carrito si no está en él
          cartItems.push({
              productId,
              productName,
              productPrice,
              quantity: 1
          });
      }
      // Guardar el carrito en localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      Toastify({
          text: "PRODUCTO AGREGADO",
          duration: 2000,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #3730a3)",
            borderRadius: "0.5rem",
            font: ".75rem"
          },
          offset: {
              x: '4rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
              y: '3rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
          onClick: function(){} // Callback after click
        }).showToast();

      // Actualizar la tabla del carrito
      renderCartItems();
      updateCartTotal();
  });
};

const renderCartItems = () => {
  table.innerHTML = '';

  cartItems.forEach((item, index) => {
      const newCartItem = document.createElement('tr');
      newCartItem.innerHTML = `
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.productName}</td>
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.productPrice.toFixed(2)}$</td>
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.quantity}</td>
          <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid flex justify-center items-center ">
          <button class="remove-btn bg-white cursor-pointer transition-all duration-[0.3s] ease-[ease-in] text-red-600 p-2 rounded-[50%] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in] hover:bg-red-600 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
</svg>

        
          </button>
          </td>
      `;

      table.appendChild(newCartItem);

      // Agregar event listener para el botón de eliminar
      newCartItem.querySelector('.remove-btn').addEventListener('click', () => {
          if (item.quantity > 1) {
              item.quantity--; // Disminuir la cantidad en 1 si es mayor que 1
          } else {
              cartItems.splice(index, 1); // Eliminar el producto si la cantidad es 1
          }
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          renderCartItems(); // Volver a renderizar la tabla del carrito
          updateCartTotal(); // Actualizar el total del carrito
          Toastify({
              text: "PRODUCTO ELIMINADO",
              duration: 2000,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #00b09b, #3730a3)",
                borderRadius: "0.5rem",
                font: ".75rem"
              },
              offset: {
                  x: '4rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: '3rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
              onClick: function(){} // Callback after click
            }).showToast();
      });
     
  });
};

// Modifica el EventListener del botón de compra en el carrito
buyButton.addEventListener('click', () => {
  buyProducts();
});

btnClear.addEventListener('click', e =>{
  Swal.fire({
    title: "¿Estas Seguro?",
    icon: "question",
    html: `
      Todos tus productos en el carrito seran eliminados
    `,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `SI`,
    cancelButtonText: `NO`,
  }).then((result) => {
    if (result.isConfirmed) {
      cartItems = [];
  cleanCartContent();
  updateCartTotal(); 
    }
  });

});

const loadProducts = async () => {
    try {
        const { data } = await axios.get('/api/products/', {
            withCredentials: true,
        });

        

        data.forEach(product => {
            const newProduct = document.createElement('li');
            console.log(product.productSpecifications[0].productProcessor);
            const fileName = product.productImage.split('\\').pop();
            newProduct.id = product.id;
            newProduct.className = '';
        
            newProduct.innerHTML = `
            <div class="bg-green-200 rounded-lg overflow-hidden shadow-lg max-w-sm w-96">
            <div class="h-80">
              <img class="w-full h-full object-cover" src="/images/${fileName}" alt="Product Image">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium mb-2">${product.productName}</h3>
              <p class="text-gray-600 text-sm mb-4">${product.productSpecifications[0].productProcessor}</p>
              <p class="text-gray-600 text-sm mb-4">${product.productSpecifications[0].productOs}</p>
              <p class="text-gray-600 text-sm mb-4">${product.productSpecifications[0].productStorage}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">$${product.productPrice}</span>
                <button class="add-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
            `;
        
            list.append(newProduct);
            addProductToCart(newProduct.querySelector('.add-btn'), product.id, product.productName, product.productPrice, product.quantity);


            newProduct.addEventListener('click', async (e) => {
              try {
               
                if (e.target.classList.contains('add-btn')) {
                  return 
                }
                  const response = await axios.get(`/api/products/${product.id}`);
                  const productData = response.data.product;
                  
                  console.log(productData);
                  localStorage.setItem('productDetails', JSON.stringify(productData));
                  window.location = `/product`
              } catch (error) {
                  console.error('Error al obtener los detalles del producto:', error);
                 
              }
          });

           
        });
    } catch (error) {
        console.log(error);
    }
};

const filterProducts = async(searchTerm) => {

  const { data } = await axios.get('/api/products/', {
                withCredentials: true,
            });
  
  const filteredProducts = data.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()));
  list.innerHTML = ''; // Limpiar la lista actual
  filteredProducts.forEach(product => {
      const newProduct = document.createElement('li');
      const fileName = product.productImage.split('\\').pop();
            newProduct.id = product.id;
            newProduct.className = '';
        
            newProduct.innerHTML = `
            <div class="bg-green-200 rounded-lg overflow-hidden shadow-lg max-w-sm w-96">
            <div class="h-80">
              <img class="w-full h-full object-cover" src="/images/${fileName}" alt="Product Image">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium mb-2">${product.productName}</h3>
              <p class="text-gray-600 text-sm mb-4">${product.productSpecifications[0].productProcessor}</p>
              <p class="text-gray-600 text-sm mb-4">${product.productSpecifications[0].productOs}</p>
              <p class="text-gray-600 text-sm mb-4">${product.productSpecifications[0].productStorage}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">$${product.productPrice}</span>
                <button class="add-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
            `;
      
      list.appendChild(newProduct);
      addProductToCart(newProduct.querySelector('.add-btn'), product.id, product.productName, product.productPrice, product.quantity);


            newProduct.addEventListener('click', async (e) => {
              try {
               
                if (e.target.classList.contains('add-btn')) {
                  return 
                }
                  const response = await axios.get(`/api/products/${product.id}`);
                  const productData = response.data.product;
                  
                  console.log(productData);
                  localStorage.setItem('productDetails', JSON.stringify(productData));
                  window.location = `/product`
              } catch (error) {
                  console.error('Error al obtener los detalles del producto:', error);
                 
              }
          });
  });
};

const input = document.querySelector('input[type="text"]');
input.addEventListener('input', (event) => {
  const searchTerm = event.target.value.trim(); // Obtener el valor del input
  filterProducts(searchTerm); // Filtrar los productos
});

const toggleCartSection = () => {
    navBtnStore.addEventListener('click', () => {
        sectionCart.classList.toggle('hidden');
        sectionCart.classList.toggle('flex');
    });
};

const navBar = document.querySelector('#nav-bar')
const navBtn = document.querySelector('#nav-btn')

const toggleMobileMenu = () => {
  navBtn.addEventListener('click', e =>{

    const menuMobile = navBar.children[0].children[1].children[3];
    
    if (!navBtn.classList.contains('active')) {
      navBtn.classList.add('active');
      navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />`; 
      menuMobile.classList.remove('hidden');
      menuMobile.classList.add('flex');
    } else {
      navBtn.classList.remove('active');
      navBtn.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />`;
      menuMobile.classList.add('hidden');
      menuMobile.classList.remove('flex');
    } 
  })};

  const closeBtnDesktop = navBar.children[0].children[1].children[2].children[0];
  const closeBtnMobile = navBar.children[0].children[1].children[3].children[0];
  
  closeBtnDesktop.addEventListener('click',async e =>{
    console.log(e.target);
   
  try {
    await axios.get('/api/logout');
    console.log('sesion cerrada');
    window.location.replace('/login');
    
  } catch (error) {
    console.log('error');
    
  }
  });
  
  
  closeBtnMobile.addEventListener('click',async e =>{
    console.log(e.target);
    
   
    try {
      await axios.get('/api/logout');
      window.location.replace('/login');
      
    } catch (error) {
      console.log('error');
      
    }
    });

    const loadCartFromLocalStorage = () => {
      const cartItemsJson = localStorage.getItem('cartItems');
      if (cartItemsJson) {
          cartItems = JSON.parse(cartItemsJson);
          renderCartItems();
          updateCartTotal();
      }
  };
  
  // Llamar a la función para cargar el carrito del localStorage al cargar la página
  loadCartFromLocalStorage();    
  

loadProducts();
toggleMobileMenu();
toggleCartSection();


(async () => {
  
    
    const { data } = await axios.get(`/api/purchases`, {
        withCredentials: true,
    });
    try {
        for (const purchase of data) {
            const validation = purchase.validated;
            // Obtener el nombre del usuario

            const userResponse = await axios.get(`/api/users/${purchase.user}`);
            const userName = userResponse.data.name;

            // Obtener los nombres de los productos y sus cantidades
            const productDetails = [];
            for (const productInfo of purchase.products) {
                const productResponse = await axios.get(`/api/products/${productInfo.product}`);
                const productName = productResponse.data.product.productName;
                console.log(productResponse.data.product.productName);
                productDetails.push({
                    name: productName,
                    quantity: productInfo.quantity
                });
            }

            // Crear elementos HTML para mostrar la compra
            const newPurchase = document.createElement('li');
            newPurchase.id = purchase.id;
            newPurchase.innerHTML = `
                <div class="bg-gray-900 p-4 rounded-lg shadow-lg">
                    <p class="text-gray-300"><b>Nombre del Usuario:</b> ${userName}</p>
                    <p class="text-gray-300"><b>Productos:</b></p>
                    <ul>
                        ${productDetails.map(product => `<li class="text-white">${product.name} - Cantidad: ${product.quantity}</li>`).join('')}
                    </ul>
                    <p class="text-gray-300"><b>Precio Total:</b> ${purchase.totalPrice}$</p>
                    <p class="text-gray-300"><b>Confirmacion de Compra:</b>${String(validation)}</p>
                    <div class="flex justify-between">
                        <button id="validate-purchase-btn"class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Pagar</button>
                        <button id="delete-purchase-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                    </div>
                </div>
            `;
            listPurchases.append(newPurchase);

            newPurchase.querySelector('#validate-purchase-btn').addEventListener('click', async () => {
              window.location.href = '/pago';
          });


            newPurchase.addEventListener('click',async e =>{

                if (e.target.closest('#delete-purchase-btn')) {
               
                    const li = e.target.closest('#delete-purchase-btn').parentElement.parentElement.parentElement;
                    console.log(li.id);
                    await axios.delete(`/api/purchases/${li.id}`);
                    li.remove();
                    console.log('si');
                }
               
            })
        }
    } catch (error) {
        console.log(error);
    }
})();
