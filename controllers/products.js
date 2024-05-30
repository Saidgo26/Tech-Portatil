const productsRouter = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');
const { Parser } = require('json2csv');


// Ruta para descargar el inventario en formato CSV
productsRouter.get('/download-inventory', async (req, res) => {
    try {
        const products = await Product.find();
        
        if (!products.length) {
            return res.status(404).json({ error: 'No hay productos disponibles' });
        }

        const fields = ['productName', 'productDescription', 'productBrand', 'productPrice', 'quantity', 'createdAt', 'updatedAt'];
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(products);

        res.header('Content-Type', 'text/csv');
        res.attachment('inventory.csv');
        return res.send(csv);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al generar el archivo CSV' });
    }
});


productsRouter.get('/', async (request, response) => {
    try {
        const products = await Product.find();
        return response.status(200).json(products);
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
});
productsRouter.get('/:id', async (request, response) => {
    try {
        const productId = request.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return response.status(404).json({ error: 'Producto no encontrado' });
        }
        return response.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return response.sendStatus(500);
    }
});

productsRouter.post('/', async (request, response) => {
    try {
        const { productName, productDescription, productBrand, productPrice, productImage, productSpecifications, quantity } = request.body;

        const newProduct = new Product({
            productImage,
            productName,
            productDescription,
            productBrand,
            productPrice,
            productSpecifications,
            quantity
        });

        const savedProduct = await newProduct.save();
        return response.status(201).json(savedProduct);
    } catch (error) {
        console.error('No se ha podido crear el Producto:', error);
        return response.status(500).json({ error: 'Error al crear el producto' });
    }
});




productsRouter.delete('/:id', async (request, response) => {
    try {
        const user = request.user;

    await Product.findByIdAndDelete(request.params.id);
    
    // Inicializar user.products como un array vacío si es undefined
    user.products = user.products || [];

    // Eliminar el ID del producto de user.products
    const index = user.products.indexOf(request.params.id);
    if (index !== -1) {
        user.products.splice(index, 1);
        console.log(`Eliminando producto con ID ${request.params.id} del usuario ${user._id}`);
    }

    await user.save();
    console.log(`Productos actualizados del usuario ${user._id}: ${user.products}`);
    return response.status(204).send();
    } catch (error) {
        console.log(error);
        
    }
});



productsRouter.patch('/:id', async (request, response) => {
    const productId = request.params.id;
    const { productImage, productName, productDescription, productBrand, productPrice , productSpecifications, quantity } = request.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            productImage,
            productName,
            productDescription,
            productBrand,
            productPrice, 
            productSpecifications, 
            quantity
        }, { new: true });

        return response.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        return response.sendStatus(402);
    }
});




module.exports = productsRouter;

