const express = require("express");

const productRouter = express.Router();

let products = [
  { id: 1, name: "iPhone 12 Pro", price: 1099.99 },
  { id: 2, name: "Samsung Galaxy S21", price: 999.99 },
  { id: 3, name: "Sony PlayStation 5", price: 499.99 },
  { id: 4, name: "MacBook Pro 16", price: 2399.99 },
  { id: 5, name: "DJI Mavic Air 2", price: 799.99 },
];

// CRUD
// READ path: /   METHOD: GET  --> [{}]
productRouter.get("/", (req, res, next) => {
  if (products.length == 0) {
    const newErr = new Error("Products has not data");
    newErr.status = 404;

    next(newErr);
    return;
  }

  res.render('products', {
    products
  });
//   res.send(products);
}); // REQUEST PATH = '/products/'

// CREATE path: /   METHOD: POST  body: {name: '.....', price: 100000}
productRouter.post("/", (req, res, next) => {
  if (!req.body.name) {
    const newErr = new Error("Name is not provided in the request body");
    newErr.status = 300;

    next(newErr);
    return;
  }

  const newPrd = {
    id: products.length + 1,
    ...req.body, // name: '', price
  };

  products.push(newPrd);

  res.status(201).send({ message: "Product added successfully", products });
});

productRouter.delete("/:id", (req, res, next) => {
  // Verify if the product with the provided id exists in the Array
  const findPrd = products.find((prd) => prd.id == req.params.id); // undefined | object

  if (!findPrd) {
    const newError = new Error("Product not found");
    newError.status = 404;

    next(newError);
    return;
  }

  products = products.filter((prd) => prd.id !== findPrd.id);

  res.status(201).send({ message: "Deleted", products });
});

module.exports = {
  productRouter,
};
