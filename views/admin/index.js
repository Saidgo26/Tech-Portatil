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
              <p class= text-md font-semibold mb-4">Disponible(s):${product.quantity}</p>
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

document.getElementById('download-inventory-btn').addEventListener('click', () => {
    window.location.href = '/api/products/download-inventory'; // Asegúrate de que la ruta es correcta
});

(async () => {
    localStorage.removeItem('productDetails');
    try {
        const { data } = await axios.get('/api/purchases', { withCredentials: true });

        // Crear la estructura de la tabla
        const table = document.createElement('div');
        table.classList.add('overflow-x-auto');

        const innerTable = document.createElement('table');
        innerTable.classList.add('min-w-full', 'divide-y', 'divide-gray-200', 'bg-gray-900', 'text-white', 'rounded-lg', 'shadow-lg');
        innerTable.innerHTML = `
            <thead class="bg-gray-700">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre del Usuario</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Productos</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Precio Total</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Confirmación de Pago</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Confirmación de Envío</th>
                    <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
            </tbody>
        `;

        const tableBody = innerTable.querySelector('tbody');

        for (const purchase of data) {
            const paymentValidation = purchase.paymentValidated;
            const shippingValidation = purchase.shipped;
            const userName = purchase.user.name; // Supongo que has poblado el campo 'user' en el backend

            // Obtener los nombres de los productos y sus cantidades
            const productDetails = [];
            for (const productInfo of purchase.products) {
                const productResponse = await axios.get(`/api/products/${productInfo.product}`);
                const productName = productResponse.data.product.productName;
                productDetails.push({
                    name: productName,
                    quantity: productInfo.quantity
                });
            }

            // Crear fila de la tabla para mostrar la compra
            const newRow = document.createElement('tr');
            newRow.id = purchase.id;
            newRow.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${userName}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <ul>
                        ${productDetails.map(product => `<li>${product.name} - Cantidad: ${product.quantity}</li>`).join('')}
                    </ul>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">${purchase.totalPrice}$</td>
                <td class="px-6 py-4 whitespace-nowrap">${paymentValidation ? 'Pagado' : 'No Pagado'}</td>
                <td class="px-6 py-4 whitespace-nowrap">${shippingValidation ? 'Confirmado' : 'No Confirmado'}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button id="delete-purchase-btn" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Eliminar</button>
                   
                    <button id="validate-shipping-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Confirmar Envío</button>
                </td>
            `;

            tableBody.append(newRow);

            newRow.addEventListener('click', async e => {
               
                if (e.target.closest('#delete-purchase-btn')) {
                    const tr = e.target.closest('tr');
                    await axios.delete(`/api/purchases/${tr.id}`);
                    tr.remove();
                }
                if (e.target.closest('#validate-shipping-btn')) {
                    const tr = e.target.closest('tr');
                    const response = await axios.patch(`/api/purchases/${tr.id}/shipped`);
                    tr.querySelector('td:nth-child(5)').textContent = response.data.shipped ? 'Confirmado' : 'No Confirmado';
                    e.target.textContent = response.data.shipped ? 'Cancelar Envío' : 'Confirmar Envío';
                }
            });
        }

        table.appendChild(innerTable);

        // Añadir la tabla al documento
        document.getElementById('listPurchases').appendChild(table);
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

