const mongoose = require("mongoose");

const productschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  product_Model: {
    type: String,
    required: "Kindly enter the name of the product",
  },
  product_Name: {
    type: String,
    required: "Kindly enter the name of the product",
  },
  price: {
    type: Number,
    required: "Kindly enter the price of the model",
  },
  QuantityAvailable: {
    type: Number,
    required: "Kindly enter the available quantity",
  },
});

module.exports = mongoose.model("Product", productschema);
