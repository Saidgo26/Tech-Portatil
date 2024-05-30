document.addEventListener('DOMContentLoaded', () => {
    // Load purchase details from localStorage
    const purchaseDetails = JSON.parse(localStorage.getItem('purchaseDetails'));
    const products = purchaseDetails.products;
    const totalPrice = purchaseDetails.totalPrice;

    console.log(products, totalPrice);

    // Display products and total price in the summary section
    const productsContainer = document.getElementById('products-container');
    products.forEach(p => {
        const productDiv = document.createElement('div');
        productDiv.id = 'product';
        productDiv.className = 'flex flex-col rounded-lg bg-slate-300 sm:flex-row md:flex-row';
        productDiv.innerHTML = `
            <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src="/images/pc3.jpg" alt="" />
            <div class="flex w-full flex-col px-4 py-4">
                <p class="font-semibold">${p.productName}</p>
                <p class="font-semibold">Cantidad: <span>${p.quantity}</span></p>
                <p class="text-lg font-bold">$${p.productPrice}</p>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });
    document.getElementById('total-amount').textContent = `$${totalPrice}`;

    // Initialize Stripe
    const stripe = Stripe('pk_test_51PGFj6EIeGzkZJ8J6v79SMlVOmTzrxPfpWpzBFHZGCfnysf4lvJviCpTSqL02mfESX2GRODNHU0OFEx7Zn5MAfhs00dW13Rroe');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { paymentMethod, error } = await stripe.createPaymentMethod(
            'card', cardElement, {
                billing_details: { name: document.getElementById('card-holder-name').value }
            }
        );

        if (error) {
            document.getElementById('card-errors').textContent = error.message;
        } else {
            try {
                const response = await axios.post('/api/payment', { paymentMethodId: paymentMethod.id, amount: totalPrice });
                console.log('Pago exitoso', response.data);

                // Crear compra después de un pago exitoso
                const purchaseProducts = products.map(p => ({
                    product: p.productId,
                    quantity: p.quantity
                }));

                const purchaseResponse = await axios.post('/api/purchases', {
                    products: purchaseProducts,
                    totalPrice: totalPrice
                });

                console.log('Compra creada con éxito', purchaseResponse.data);
                alert('Pago y compra realizados con éxito');
                localStorage.removeItem('cartItems');
                localStorage.removeItem('purchaseDetails');
                window.location.pathname = `/store/` // Limpiar localStorage después de la compra
            } catch (paymentError) {
                console.error('Error en el pago o la compra', paymentError);
                document.getElementById('card-errors').textContent = 'Error en el pago o la compra. Por favor, intenta de nuevo.';
            }
        }
    });
});