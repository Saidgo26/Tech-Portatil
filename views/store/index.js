const list = document.querySelector('#listProducts');
const sectionCart = document.querySelector('#section-cart');
const navBtnStore = document.querySelector('#nav-btn-store');
const addBtn = document.querySelectorAll(".add-btn");
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

const buyProducts = async () => {
    try {
        
        
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
        table.innerHTML = '';
        updateCartTotal();

        alert('Compra realizada con éxito');
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert('Error al realizar la compra');
    }
};


const addProductToCart = (btn, productId, productName, productPrice) => {
    btn.addEventListener('click', () => {
        // Verificar si el producto ya está en el carrito
        const existingItem = cartItems.find(item => item.productId === productId);

        if (existingItem) {
            // Incrementar la cantidad si el producto ya está en el carrito
            existingItem.quantity++;
        } else {
            // Agregar el producto al carrito si no está en él
            cartItems.push({
                productId,
                productName,
                productPrice,
                quantity: 1
            });
        }

        // Actualizar la tabla del carrito
        renderCartItems();
        updateCartTotal();
    });
};

const renderCartItems = () => {
    table.innerHTML = '';

    cartItems.forEach(item => {
        const newCartItem = document.createElement('tr');
        newCartItem.innerHTML = `
            <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.productName}</td>
            <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.productPrice.toFixed(2)}$</td>
            <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid">${item.quantity}</td>
            <td class="h-24 font-bold px-0 py-4 border-b-[rgb(107,106,106)] border-b border-solid flex justify-center items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 remove-btn bg-white cursor-pointer transition-all duration-[0.3s] ease-[ease-in] text-red-600 p-2 rounded-[50%] hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in] hover:bg-red-600 hover:text-white">
            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" /></svg>
            </td>
        `;

        table.appendChild(newCartItem);
    });

    // Agregar event listener para los botones de eliminar
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            cartItems.splice(index, 1); // Eliminar el producto del carrito
            renderCartItems(); // Volver a renderizar la tabla del carrito
            updateCartTotal(); // Actualizar el total del carrito
        });
    });
};

// Modifica el EventListener del botón de compra en el carrito
buyButton.addEventListener('click', () => {
    buyProducts();
});

btnClear.addEventListener('click', e =>{
    table.innerHTML = '';
});

const loadProducts = async () => {
    try {
        const { data } = await axios.get('/api/products', {
            withCredentials: true,
        });

        data.forEach(product => {
            const newProduct = document.createElement('li');
            
            const fileName = product.productImage.split('\\').pop();
            newProduct.id = product.id;
            newProduct.className = 'bg-zinc-100 h-80 flex flex-col w-full shadow-md rounded-lg md:w-2/5 lg:w-[30%]';
            newProduct.innerHTML = `
                <div class="h-2/5">
                    <img src="/images/${fileName}" alt="${product.productName}" class="w-full h-full object-cover rounded-[0.5rem_0.5rem_0_0]">
                </div>
                <div class=" h-auto flex flex-col justify-between text-xl p-4 bg-slate-500 rounded-b-md">
                    <p id="product-name" class="font-bold text-white">${product.productName}</p>
                    <p  class="text-white">${product.productDescription}</p>
                    <p class="text-white">${product.productBrand}</p>
                    <p id="product-price" class="font-bold text-white">${product.productPrice}$</p>
                    <button class="add-btn font-bold bg-indigo-800 text-[white] cursor-pointer p-4 rounded-lg hover:bg-indigo-900 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Agregar al Carrito</button>
                </div>
            `;
            list.append(newProduct);
            addProductToCart(newProduct.querySelector('.add-btn'), product.id, product.productName, product.productPrice);
        });
    } catch (error) {
        console.log(error);
    }
};

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
  

loadProducts();
toggleMobileMenu();
toggleCartSection();


// (async () => {
    
//     const { data } = await axios.get(`/api/purchases`, {
//         withCredentials: true,
//     });
//     try {
//         for (const purchase of data) {
//             const validation = purchase.validated;
//             // Obtener el nombre del usuario

//             const userResponse = await axios.get(`/api/users/${purchase.user}`);
//             const userName = userResponse.data.name;

//             // Obtener los nombres de los productos y sus cantidades
//             const productDetails = [];
//             for (const productInfo of purchase.products) {
//                 const productResponse = await axios.get(`/api/products/${productInfo.product}`);
//                 const productName = productResponse.data.product.productName;
//                 console.log(productResponse.data.product.productName);
//                 productDetails.push({
//                     name: productName,
//                     quantity: productInfo.quantity
//                 });
//             }

//             // Crear elementos HTML para mostrar la compra
//             const newPurchase = document.createElement('li');
//             newPurchase.id = purchase.id;
//             newPurchase.innerHTML = `
//                 <div class="bg-gray-900 p-4 rounded-lg shadow-lg">
//                     <p class="text-gray-300"><b>Nombre del Usuario:</b> ${userName}</p>
//                     <p class="text-gray-300"><b>Productos:</b></p>
//                     <ul>
//                         ${productDetails.map(product => `<li class="text-white">${product.name} - Cantidad: ${product.quantity}</li>`).join('')}
//                     </ul>
//                     <p class="text-gray-300"><b>Precio Total:</b> ${purchase.totalPrice}$</p>
//                     <p class="text-gray-300"><b>Confirmacion de Compra:</b>${String(validation)}</p>
//                     <div class="flex items-center justify-center">
//                         <button id="delete-purchase-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
//                     </div>
//                 </div>
//             `;
//             listPurchases.append(newPurchase);


//             newPurchase.addEventListener('click',async e =>{

//                 if (e.target.closest('#delete-purchase-btn')) {
               
//                     const li = e.target.closest('#delete-purchase-btn').parentElement.parentElement.parentElement;
//                     console.log(li.id);
//                     await axios.delete(`/api/purchases/${li.id}`);
//                     li.remove();
//                     console.log('si');
//                 }
               
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();
