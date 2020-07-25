const express = require("express");
const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://sukku:1234@firstapi-shard-00-00-3jwh7.mongodb.net:27017,firstapi-shard-00-01-3jwh7.mongodb.net:27017,firstapi-shard-00-02-3jwh7.mongodb.net:27017/test?ssl=true&replicaSet=firstapi-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);
app.use((req, res, next) => {
  res.status(404).json({
    message: "error",
  });
});
module.exports = app;
mongoose.Promise = global.Promise;
