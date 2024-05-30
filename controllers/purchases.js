const purchasesRouter = require('express').Router();
const Product = require('../models/product');
const Purchase = require('../models/purchase');


purchasesRouter.post('/', async (request, response) => {
    try {
        const user = request.user;
        const { products, totalPrice } = request.body;

        // Crear una nueva instancia de Purchase con los datos recibidos
        const newPurchase = new Purchase({
            products,
            totalPrice,
            user: user._id,
            paymentValidated: true
        });

        // Guardar la nueva compra en la base de datos
        const savedPurchase = await newPurchase.save();

        // Actualizar la cantidad de productos en la base de datos
        for (const product of products) {
            const purchasedProduct = await Product.findById(product.product);
            if (!purchasedProduct) {
                return response.status(404).json({ error: 'Producto no encontrado' });
            }
            purchasedProduct.quantity -= product.quantity;
            await purchasedProduct.save();
        }

        // Agregar la compra al usuario
        user.purchase.push(savedPurchase._id);
        await user.save();
       
        return response.status(201).json(savedPurchase);
    } catch (error) {
        console.error('Error al crear la compra:', error);
        return response.status(403).json({ error: 'Error al crear la compra' });
    }
});



purchasesRouter.get('/', async (request, response) => {
    try {
        const purchases = await Purchase.find({}).populate('user', 'name');

        return response.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        return response.status(500).json({ error: 'Error al obtener las compras' });
    }
});

module.exports = purchasesRouter;




purchasesRouter.delete('/:id', async (request, response) => {
    try {
        const purchaseId = request.params.id;
        const deletedPurchase = await Purchase.findByIdAndDelete(purchaseId);
        if (!deletedPurchase) {
            return response.status(404).json({ error: 'Compra no encontrada' });
        }
        return response.status(204).send();
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
});

purchasesRouter.patch('/:id/shipped', async (request, response) => {
    try {
        // Buscar la compra por ID
        const purchase = await Purchase.findById(request.params.id);

        // Comprobar si la compra existe
        if (!purchase) {
            return response.status(404).json({ error: 'Compra no encontrada' });
        }

        // Alternar el valor de shipped
        purchase.shipped = !purchase.shipped;

        // Guardar la compra actualizada
        await purchase.save();

        return response.status(200).json({ shipped: purchase.shipped });
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
}); 






module.exports = purchasesRouter;