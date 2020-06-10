const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },    
    date: {
        type: Date,
        required: true
    }    
})
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
