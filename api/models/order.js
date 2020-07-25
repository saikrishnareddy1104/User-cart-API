const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  email: {
    type: String,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderschema);
