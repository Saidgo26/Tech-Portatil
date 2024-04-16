const form = document.querySelector('#productForm');
const nameProduct = document.querySelector('#productName');
const description = document.querySelector('#productDescription');
const brand = document.querySelector('#productBrand');
const price = document.querySelector('#productPrice');
const image = document.querySelector('#productImage');
const list = document.querySelector('#listProducts');
const editForm = document.querySelector('#editProductForm');
const editNameProduct = document.querySelector('#editProductName');
const editDescription = document.querySelector('#editProductDescription');
const editBrand = document.querySelector('#editProductBrand');
const editPrice = document.querySelector('#editProductPrice');
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
            newProduct.id = product.id;
            newProduct.className = 'bg-zinc-100 h-80 flex flex-col w-full shadow-md rounded-lg md:w-2/5 lg:w-[30%]';
            newProduct.innerHTML = `
            <div class="h-2/5">
                <img src="${product.productImage}" alt="" class="w-full h-full object-cover rounded-[0.5rem_0.5rem_0_0]">
            </div>
            <div class="h-3/5 flex flex-col justify-between text-xl p-4 bg-slate-500 rounded-b-md">
                <p class="font-bold text-white">${product.productName}</p>
                <p class="text-white">${product.productDescription}</p>
                <p class="text-white">${product.productBrand}</p>
                <p class="font-bold text-white">${product.productPrice}</p>
                <div class="flex justify-between">
                <button class="delete-product-btn font-bold bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Eliminar</button>
                <button class="edit-product-btn font-bold bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Editar</button>
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
    const { data } = await axios.get('/api/purchases', {
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
                    <p class="text-gray-300"><b>Precio Total:</b> ${purchase.totalPrice}</p>
                    <p class="text-gray-300"><b>Confirmacion de Compra:</b>${String(validation)}</p>
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
        const { data } = await axios.post('/api/products', {
            productImage: image.value,
            productName: nameProduct.value,
            productDescription: description.value,
            productBrand: brand.value,
            productPrice: price.value
        });

        // Crear un nuevo elemento de lista con los datos del producto y agregarlo a la lista en el frontend
        const newProduct = document.createElement('li');
        newProduct.id = data._id; // Cambiado de data.id a data._id
        newProduct.className = 'bg-zinc-100 h-80 flex flex-col w-full transition-all duration-[0.3s] ease-[ease-in] shadow-md rounded-lg md:w-2/5 lg:w-[30%]';
        newProduct.innerHTML = `
        <div class="h-2/5">
            <img src="${data.productImage}" alt="" class="w-full h-full object-cover rounded-[0.5rem_0.5rem_0_0]">
        </div>
        <div class="h-3/5 flex flex-col justify-between text-xl p-4 bg-slate-500 rounded-b-md">
            <p class="font-bold text-white">${data.productName}</p>
            <p class="text-white">${data.productDescription}</p>
            <p class="text-white">${data.productBrand}</p>
            <p class="font-bold text-white">${data.productPrice}</p>
            <div class="flex justify-between">
                <button class="delete-product-btn font-bold bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Eliminar</button>
                <button class="edit-product-btn font-bold bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Editar</button>
            </div>
        </div>
        `;
        list.appendChild(newProduct);
        nameProduct.value = '';
        description.value = '';
        brand.value = '';
        price.value = '';
        image.value = '';
    } catch (error) {
        console.error('No se ha podido crear el Producto:', error);
    }
});



// Evento en la lista de productos para eliminar o editar un producto
list.addEventListener('click', async e => {

if (e.target.closest('.delete-product-btn')) {
    // Eliminar producto
    const li = e.target.closest('.delete-product-btn').parentElement.parentElement.parentElement;
    await axios.delete(`/api/products/${li.id}`);
    li.remove();
    console.log('si');
}
if (e.target.closest('.edit-product-btn')) {
// Mostrar formulario de edición y cargar datos del producto seleccionado
console.log(e.target);
    containerProducts.classList.add('hidden', 'lg:hidden');
    containerProducts.classList.remove('lg:flex');
    const li = e.target.closest('.edit-product-btn').parentElement.parentElement.parentElement;
    const productId = li.id
    console.log(productId);
    const {data} = await axios.get(`/api/products/${productId}`,{
        withCredentials: true,
    });
    console.log(data.product);
    editNameProduct.value = data.product.productName;
    editDescription.value = data.product.productDescription;
    editBrand.value = data.product.productBrand;
    editPrice.value = data.product.productPrice;
    editContainerProducts.classList.remove('hidden', 'lg:hidden');
    editContainerProducts.classList.add('lg:flex');

    editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { data } = await axios.patch(`/api/products/${productId}`, {
        productImage: editImage.value,
        productName: editNameProduct.value,
        productDescription: editDescription.value,
        productBrand: editBrand.value,
        productPrice: editPrice.value
    });
    console.log(data);
    // Actualizar los datos del producto en la lista en el frontend
    li.innerHTML = `
    <div class="h-2/5">
    <img src="${data.productImage}" alt="" class="w-full h-full object-cover rounded-[0.5rem_0.5rem_0_0]">
</div>
<div class="h-3/5 flex flex-col justify-between text-xl p-4 bg-slate-500 rounded-b-md">
    <p class="font-bold text-white">${data.productName}</p>
    <p class="text-white">${data.productDescription}</p>
    <p class="text-white">${data.productBrand}</p>
    <p class="font-bold text-white">${data.productPrice}</p>
    <div class="flex justify-between">
    <button class="delete-product-btn font-bold bg-red-500 text-white cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Eliminar</button>
    <button class="edit-product-btn font-bold bg-blue-500 text-white cursor-pointer p-2 rounded-lg hover:bg-blue-600 hover:transition-all hover:duration-[0.3s] hover:ease-[ease-in]">Editar</button>
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

