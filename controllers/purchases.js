const purchasesRouter = require('express').Router();
const Purchase = require('../models/purchase');

purchasesRouter.post('/', async (request, response) => {
    
    try {
        const user = request.user;
        const { products, totalPrice} = request.body;

        // Crea una nueva instancia de Purchase con los datos recibidos
        const newPurchase = new Purchase({
            products,
            totalPrice,
            user: user._id
        });

        // Guarda la nueva compra en la base de datos
        const savedPurchase = await newPurchase.save();

        // Agrega la compra al usuario
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
        // Obtener todas las compras de la base de datos
        const purchases = await Purchase.find();

        // Devolver las compras en formato JSON
        return response.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        return response.status(500).json({ error: 'Error al obtener las compras' });
    }
});


purchasesRouter.get('/:id', async (request, response) => {

    try {
        const userId = request.user
    
        // Obtener todas las compras del usuario de la base de datos
        const purchase = await Purchase.find({ user: userId });
        // Devolver las compras en formato JSON
        return response.status(200).json(purchase);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        return response.status(500).json({ error: 'Error al obtener las compras' });
    }
});

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

purchasesRouter.patch('/:id', async (request, response) => {
    try {
        const { validated } = request.body;

        // Validar que validated sea un booleano
        if (typeof validated !== 'boolean') {
            return response.status(400).json({ error: 'El campo "validated" debe ser un booleano' });
        }

        // Buscar la compra por ID y actualizar el campo validated
        const purchase = await Purchase.findByIdAndUpdate(request.params.id, { validated }, { new: true });

        // Comprobar si la compra existe
        if (!purchase) {
            return response.status(404).json({ error: 'Compra no encontrada' });
        }

        return response.sendStatus(200);
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
});



module.exports = purchasesRouter;