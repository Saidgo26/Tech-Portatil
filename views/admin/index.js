const form = document.querySelector('#productForm');
const list = document.querySelector('#listProducts');
const nameProduct = document.querySelector('#productName');
const description = document.querySelector('#productDescription');
const brand = document.querySelector('#productBrand');
const price = document.querySelector('#productPrice');
const quantity = document.querySelector('#productQuantity');
const image = document.querySelector('#productImage');
const processor = document.querySelector('#processor');
const graphics = document.querySelector('#graphics');
const memory = document.querySelector('#memory');
const storage = document.querySelector('#storage');
const screen = document.querySelector('#screen');
const os = document.querySelector('#os');
const editProcessor = document.querySelector('#editProcessor');
const editGraphics = document.querySelector('#editGraphics');
const editMemory = document.querySelector('#editMemory');
const editStorage = document.querySelector('#editStorage');
const editScreen = document.querySelector('#editScreen');
const editOS = document.querySelector('#editOS');
const editForm = document.querySelector('#editProductForm');
const editNameProduct = document.querySelector('#editProductName');
const editDescription = document.querySelector('#editProductDescription');
const editBrand = document.querySelector('#editProductBrand');
const editPrice = document.querySelector('#editProductPrice');
const editQuantity = document.querySelector('#editProductQuantity');
const editImage = document.querySelector('#editProductImage');
const containerProducts = document.querySelector('#container-products');
const editContainerProducts = document.querySelector('#edit-container-product');
const listPurchases = document.querySelector('#listPurchases');



// Cargar los productos desde la BD al cargar la página
(async() => {
    const {data} = await axios.get('/api/products',{
        withCredentials: true,
    });
try {

        data.forEach(product => {
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
                <button class="delete-product-btn font-bold bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Eliminar</button>
    <button class="edit-product-btn font-bold bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Editar</button>
              </div>
            </div>
          </div>
    `;
            list.append(newProduct);
        });
} catch (error) {
    console.log(error);
        // window.location.pathname = '/login'
}
})();

(async () => {
    localStorage.removeItem('productDetails');
    const { data } = await axios.get('/api/purchases', {
        withCredentials: true,
        
    });
    try {
        for (const purchase of data) {
            const validation = purchase.validated;
            console.log();
            // Obtener el nombre del usuario

            const userResponse = await axios.get(`/api/users/${purchase.user}`);
            const userName = userResponse.data.name;

            // Obtener los nombres de los productos y sus cantidades
            const productDetails = [];
            for (const productInfo of purchase.products) {
                const productResponse = await axios.get(`/api/products/${productInfo.product}`);
                const productName = productResponse.data.product.productName;
                // console.log(productResponse.data.product.productName);
                productDetails.push({
                    name: productName,
                    quantity: productInfo.quantity
                });
            }

            // Crear elementos HTML para mostrar la compra
            const newPurchase = document.createElement('li');
            const trueIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-500">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
            </svg>
            `;
            const falseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6  text-red-600">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
          </svg>
            `
            newPurchase.id = purchase.id;
            newPurchase.innerHTML = `
                <div class="bg-gray-900 p-4 rounded-lg shadow-lg">
                    <p class="text-gray-300"><b>Nombre del Usuario:</b> ${userName}</p>
                    <p class="text-gray-300"><b>Productos:</b></p>
                    <ul>
                        ${productDetails.map(product => `<li class="text-white">${product.name} - Cantidad: ${product.quantity}</li>`).join('')}
                    </ul>
                    <p class="text-gray-300"><b>Precio Total:</b> ${purchase.totalPrice}$</p>
                    <p class="text-gray-300"><b>Confirmacion de Compra:</b>${validation ? `${trueIcon}` : `${falseIcon}`}</p>
                    <div class="flex justify-between">
                        <button id="delete-purchase-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                        <button id="validate-purchase-btn"class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Confirmar</button>
                    </div>
                </div>
            `;
            listPurchases.append(newPurchase);


            newPurchase.addEventListener('click',async e =>{

                if (e.target.closest('#delete-purchase-btn')) {
               
                    const li = e.target.closest('#delete-purchase-btn').parentElement.parentElement.parentElement;
                    console.log(li.id);
                    await axios.delete(`/api/purchases/${li.id}`);
                    li.remove();
                    console.log('si');
                }
                if (e.target.closest('#validate-purchase-btn')) {
               
                    const li = e.target.closest('#validate-purchase-btn').parentElement.parentElement.parentElement;
                    console.log(li.id);
                    await axios.patch(`/api/purchases/${li.id}`, {validated: true})
                    
                }

            })
        }
    } catch (error) {
        console.log(error);
    }
})();




// Evento en el formulario de creación para agregar un producto a la BD
    form.addEventListener('submit', async e => {
        e.preventDefault();
        try {
            let Specifications = [];

            Specifications.push({
                        productProcessor: processor.value,
                        productGraphics: graphics.value,
                        productMemory: memory.value,
                        productStorage: storage.value,
                        productScreen: screen.value,
                        productOs: os.value
            });


            const { data } = await axios.post('/api/products', {
                productImage: image.value,
                productName: nameProduct.value,
                productDescription: description.value,
                productBrand: brand.value,
                productPrice: price.value,
                productSpecifications : Specifications,
                quantity: quantity.value
            });
            console.log(data);

            // Crear un nuevo elemento de lista con los datos del producto y agregarlo a la lista en el frontend
            const newProduct = document.createElement('li');
    newProduct.id = data._id;
    const fileName = data.productImage.split('\\').pop();
            newProduct.id = data.id;
            newProduct.className = '';
        
            newProduct.innerHTML = `
            <div class="bg-green-200 rounded-lg overflow-hidden shadow-lg max-w-sm w-96">
            <div class="h-80">
              <img class="w-full h-full object-cover" src="/images/${fileName}" alt="Product Image">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium mb-2">${data.productName}</h3>
              <p class="text-gray-600 text-sm mb-4">${data.productSpecifications[0].productProcessor}</p>
              <p class="text-gray-600 text-sm mb-4">${data.productSpecifications[0].productOs}</p>
              <p class="text-gray-600 text-sm mb-4">${data.productSpecifications[0].productStorage}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">$${data.productPrice}</span>
                <button class="delete-product-btn font-bold bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Eliminar</button>
    <button class="edit-product-btn font-bold bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Editar</button>
              </div>
            </div>
          </div>
    `;

    list.appendChild(newProduct);
    nameProduct.value = '';
    description.value = '';
    brand.value = '';
    price.value = '';
    image.value = '';
    processor.value = '';
    graphics.value='';
    memory.value='';
    storage.value='';
    screen.value= '';
    os.value= '';
    Specifications = [];
        } catch (error) {
            console.error('No se ha podido crear:', error);
        }
    });



// Evento en la lista de productos para eliminar o editar un producto
list.addEventListener('click', async e => {

if (e.target.closest('.delete-product-btn')) {
    // Eliminar producto
    const li = e.target.closest('.delete-product-btn').parentElement.parentElement.parentElement.parentElement;
    await axios.delete(`/api/products/${li.id}`);
    li.remove();
    console.log('si');
}
if (e.target.closest('.edit-product-btn')) {
// Mostrar formulario de edición y cargar datos del producto seleccionado

    containerProducts.classList.add('hidden', 'lg:hidden');
    containerProducts.classList.remove('lg:flex');
    const li = e.target.closest('.edit-product-btn').parentElement.parentElement.parentElement.parentElement;
    const productId = li.id
    console.log(productId);
    const {data} = await axios.get(`/api/products/${productId}`,{
        withCredentials: true,
    });
    // console.log(data.product.productSpecifications[0].productGraphics);
    editNameProduct.value = data.product.productName;
    editDescription.value = data.product.productDescription;
    editBrand.value = data.product.productBrand;
    editPrice.value = data.product.productPrice;
    editQuantity.value = data.product.quantity;
    editProcessor.value = data.product.productSpecifications[0].productProcessor;
    editGraphics.value = data.product.productSpecifications[0].productGraphics;
    editMemory.value = data.product.productSpecifications[0].productMemory;
    editStorage.value = data.product.productSpecifications[0].productStorage;
    editScreen.value = data.product.productSpecifications[0].productScreen;
    editOS.value = data.product.productSpecifications[0].productOs;
    editContainerProducts.classList.remove('hidden', 'lg:hidden');
    editContainerProducts.classList.add('lg:flex');

    editForm.addEventListener('submit', async (e) => {    
    e.preventDefault();
    let editSpecifications = [];

    editSpecifications.push({
                productProcessor: editProcessor.value,
                productGraphics: editGraphics.value,
                productMemory: editMemory.value,
                productStorage: editStorage.value,
                productScreen: editScreen.value,
                productOs: editOS.value
    });


    const { data } = await axios.patch(`/api/products/${productId}`, {
        productImage: editImage.value,
        productName: editNameProduct.value,
        productDescription: editDescription.value,
        productBrand: editBrand.value,
        productPrice: editPrice.value,
        productSpecifications : editSpecifications,
        quantity: editQuantity.value,
    });
    console.log(editProcessor.value, editGraphics.value, editMemory.value,  editStorage.value, editScreen.value , editOS.value);
    
    const fileName = data.productImage.split('\\').pop();
    // Actualizar los datos del producto en la lista en el frontend
    li.innerHTML = `
    <div class="bg-green-200 rounded-lg overflow-hidden shadow-lg max-w-sm w-96">
    <div class="h-80">
      <img class="w-full h-full object-cover" src="/images/${fileName}" alt="Product Image">
    </div>
    <div class="p-4">
      <h3 class="text-lg font-medium mb-2">${data.productName}</h3>
      <p class="text-gray-600 text-sm mb-4">${data.productSpecifications[0].productProcessor}</p>
      <p class="text-gray-600 text-sm mb-4">${data.productSpecifications[0].productOs}</p>
      <p class="text-gray-600 text-sm mb-4">${data.productSpecifications[0].productStorage}</p>
      <div class="flex items-center justify-between">
        <span class="font-bold text-lg">$${data.productPrice}</span>
        <button class="delete-product-btn font-bold bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Eliminar</button>
<button class="edit-product-btn font-bold bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Editar</button>
      </div>
    </div>
  </div>
`
    
    editContainerProducts.classList.add('hidden', 'lg:hidden');
    editContainerProducts.classList.remove('lg:flex');
    containerProducts.classList.remove('hidden', 'lg:hidden')
    containerProducts.classList.add('lg:flex')
});
}

});

