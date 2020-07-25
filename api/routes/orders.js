const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const OrdersController = require("../controllers/orders");

router.post("/:email", checkAuth, OrdersController.orders_create_order);

router.get("/", checkAuth, OrdersController.orders_get_all);

router.delete(
  "/:email/:orderId",
  checkAuth,
  OrdersController.orders_delete_order
);

router.patch("/:orderId", checkAuth, OrdersController.orders_update_order);

router.get("/:email", OrdersController.orders_get_order_per_email);

module.exports = router;
