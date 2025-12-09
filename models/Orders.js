const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        { 
            productId: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
        
}, { timestamps: true });

module.exports = mongoose.model('Order', OrdersSchema);