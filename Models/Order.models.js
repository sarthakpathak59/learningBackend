import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productItems: [productItemSchema],
    // products: [{
    //     product: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Product',
    //         required: true
    //     },
    //     quantity: {
    //         type: Number,
    //         required: true
    //     }
    // }],
    shippingAddress: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
export const Order = mongoose.model('Order', orderSchema);