const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    paymentValidated: {
        type: Boolean,
        required: true,
        default: false
    },
    shipped: {
        type: Boolean,
        required: false,
        default: false
    }
});

purchaseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
