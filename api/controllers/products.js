const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

exports.create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    product_Model: req.body.productmodel,
    product_Name: req.body.productname,
    price: req.body.price,
    QuantityAvailable: req.body.availablequantity,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "product succesfully created",
        createdproduct: {
          id: result._id,
          productmodel: result.product_Model,
          productname: result.product_Name,
          price: result.price,
          QuantityAvailable: result.QuantityAvailable,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_product = (req, res, next) => {
  Product.find()
    .exec()
    .then((doc) => {
      const response = {
        count: doc.length,
        products: doc.map((doc) => {
          return {
            productid: doc._id,
            productmodel: doc.product_Model,
            productName: doc.product_Name,
            price: doc.price,
            QuantityAvailable: doc.QuantityAvailable,
          };
        }),
      };
      res.status(200).json(response);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_product = (req, res, next) => {
  const id = req.params.productid;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Succesfully deleted the product",
        list_of_all_products: {
          type: "GET",
          url: "http://localhost:3000/products",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: err,
      });
    });
};

exports.update_product_by_id = (req, res, next) => {
  const id = req.params.productid;
  const updateops = {};
  for (const ops of req.body) {
    updateops[ops.propname] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateops })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: err,
      });
    });
};
