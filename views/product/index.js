
const sectionCart = document.querySelector('#section-cart');
const navBtnStore = document.querySelector('#nav-btn-store');
const addBtn = document.querySelector("#add-btn");
const table = document.querySelector("#table-body");
const btnClear = document.querySelector("#table-clear");
const buyButton = document.querySelector('#buy-button');
const totalPriceCart = document.querySelector('#total-price-cart');
const totalQuantityCart = document.querySelector('#total-quantity-cart');
const productNameTitle = document.querySelector('#product-name');
const productPrice = document.querySelector('#product-price');
const cleanBtn = document.querySelector('#clean-btn');
const image = document.querySelector('#imagen-producto');
const procesador = document.querySelector('#procesador');
const graficos = document.querySelector('#graficos');
const memoria = document.querySelector('#memoria');
const almacenamiento = document.querySelector('#almacenamiento');
const pantalla = document.querySelector('#pantalla');
const os = document.querySelector('#os');
const productDescription = document.querySelector('#product-description');
const productDescriptionTitle = document.querySelector('#product-description-title');
const productDescriptionContent = document.querySelector('#product-description-content');
const aditionalTitle = document.querySelector('#aditional-title');
const aditionalContent = document.querySelector('#aditional-content');


productDescriptionTitle.addEventListener('click', () => {
	productDescriptionContent.classList.toggle('hidden');
});

aditionalTitle.addEventListener('click', () => {
	aditionalContent.classList.toggle('hidden');
});


console.log(window.location.pathname);


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
  localStorage.removeItem('cartItems');
};

const buyProducts = () => {
  try {
      if (cartItems.length === 0) {
          Swal.fire("El carrito está vacío. Agrega productos antes de comprar.");
          return;
      }

      // Guardar los detalles de la compra en el localStorage
      localStorage.setItem('purchaseDetails', JSON.stringify({
          products: cartItems,
          totalPrice: parseFloat(totalPriceCart.textContent)
      }));

      // Limpiar el carrito después de guardar los detalles de la compra
      cartItems = [];
      cleanCartContent();
      updateCartTotal();

      window.location.pathname = `/pago/`

  } catch (error) {
      console.error('Error al guardar los detalles de la compra:', error);
      alert('Error al guardar los detalles de la compra');
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

const renderProduct = async () => {
  try {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));
console.log(productDetails);

      const { data } = await axios.get(`/api/products/${productDetails.id}`, {
          withCredentials: true,
      });
      console.log(data.product);
      const fileName = data.product.productImage.split('\\').pop();
      const productId = data.product.id;
      const name = data.product.productName;
      document.title = `${name}`
     const price = data.product.productPrice;
     
     const specifications = data.product.productSpecifications[0];
     console.log(specifications);

    productNameTitle.textContent = `${name}`
    productPrice.textContent = `${price}$`;
    productDescription.textContent = `${data.product.productDescription}`;
    procesador.textContent = `${specifications.productProcessor}`;
    graficos.textContent = `${specifications.productGraphics}`;
    memoria.textContent = `${specifications.productMemory}`;
    almacenamiento.textContent = `${specifications.productStorage}`;
    pantalla.textContent = `${specifications.productScreen}`;
    os.textContent = `${specifications.productOs}`;







    image.innerHTML = `
    <div id="imagen-producto" class=" md:w[49rem] w-full h-full">
            <img src="/images/${fileName}" alt="imagen-producto">
    </div>`

    addProductToCart(addBtn, productId , name , price, data.product.quantity )
      ;
      

  } catch (error) {
      console.log(error);
  }
};


document.addEventListener('DOMContentLoaded', () => {
  const productDetails = JSON.parse(localStorage.getItem('productDetails'));
  if (productDetails) {
      console.log(productDetails);
  } else {
      // Si no hay detalles de producto, muestra un mensaje o redirige al usuario
      alert('No se han encontrado detalles del producto. Por favor, seleccione un producto primero.');
      window.history.back(); // Redirige al usuario a la página anterior
  }
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

renderProduct();
toggleMobileMenu();
toggleCartSection();


