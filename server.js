const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { productRouter } = require("./routes/products");

// EJS
app.set("view engine", "ejs")
app.use(express.static(__dirname + 'views'));

// Middleware for error handling
const errorHandler = (err, req, res, next) => {
    res.status(err.status).send({message: err.message});
}

// BODY PARSER
app.use(bodyParser.json()); // MIDDLEWARE

app.use("/products", productRouter);

app.use(errorHandler);

app.listen(4000, () => {
  console.log("I AM LISTENING");
});
