const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const usersController = require("../controllers/user");

router.post("/register", usersController.user_register);

router.delete("/:email", usersController.user_delete);

router.post("/login", usersController.user_login);

router.get("/", usersController.users_get_all);

module.exports = router;
