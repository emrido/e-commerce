const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    }]
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
