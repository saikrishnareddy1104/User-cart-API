const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require("mongoose");
const ProductController = require("../controllers/products");
router.post("/", ProductController.create_product);

router.get("/", ProductController.get_product);

router.delete("/:productid", ProductController.delete_product);

router.patch("/:productid", ProductController.update_product_by_id);

module.exports = router;
