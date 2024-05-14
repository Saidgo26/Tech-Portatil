const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true
    },productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productBrand: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productSpecifications:[{

        productProcessor: {
            type: String,
            required: true
        },
        productGraphics: {
            type: String,
            required: true
        },
        productMemory: {
            type: String,
            required: true
        },
        productStorage: {
            type: String,
            required: true,
        },
        productScreen: {
            type: Number,
            required: true,
        },
        productOs: {
            type: String,
            required: true,
        }
    }],
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    }
});


productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
