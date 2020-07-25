const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        count: doc.length,
        ordercreated: doc.map((doc) => {
          return {
            id: doc._id,
            productId: doc.product_ID,
            quantity: doc.quantity,
            email: doc.email,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_create_order = (req, res, next) => {
  Product.findById(req.body.productId).then((result) => {
    if (!result) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  });
  User.findOne({ email: req.params.email }).then((result) => {
    if (!result) {
      return res.status(404).json({
        message: "email not found",
      });
    }
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      product_ID: req.body.productId,
      quantity: req.body.quantity,
      email: req.params.email,
    });
    order.save().then((doc) => {
      res.status(200).json(doc);
    });
  });
};

exports.orders_delete_order = (req, res, next) => {
  User.findOne({ email: req.params.email }).then((result) => {
    if (!result) {
      return res.status(404).json({
        message: "email not found",
      });
    }
    const id = req.params.orderId;
    Order.findOneAndDelete({ _id: id, email: req.params.email })
      .exec()
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: "Order not found",
          });
        }
        res.status(200).json({
          message: "successfully deleted the order",
          list_of_orders: {
            type: "GET",
            url: "http://localhost:3000/orders/" + req.params.email,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.orders_update_order = (req, res, next) => {
  const id = req.params.orderId;
  const updateops = {};
  for (const ops of req.body) {
    updateops[ops.propname] = ops.value;
  }
  Order.findOneAndUpdate({ _id: id }, { $set: updateops })
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

exports.orders_get_order_per_email = (req, res, next) => {
  Order.find({ email: req.params.email })
    .exec()
    .then((doc) => {
      res.status(200).json({
        count: doc.length,
        ordercreated: doc.map((doc) => {
          return {
            id: doc._id,
            productId: doc.product_ID,
            quantity: doc.quantity,
            email: doc.email,
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
