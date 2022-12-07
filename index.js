const { request } = require("express");
const express = require("express");
const Joi = require("joi");
const JOI = require("joi");

const app = express(); //creates express application on the express variable
app.use(express.json()); //used the json file

const customers = [
  {
    title: "George",
    id: 1,
  },
  {
    title: "Josh",
    id: 2,
  },
  {
    title: "Tyler",
    id: 3,
  },
  {
    title: "Alice",
    id: 4,
  },
  {
    title: "Candice",
    id: 5,
  },
];

//Read Request handlers

//Display the message when the URL consist of "/"
app.get("/", (req, res) => res.send("Response from Server"));

//Display the list of customers when it hits particular URL
app.get("/api/customers", (req, res) => res.send(customers));

//Displaying a particular customer
app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  !customer && res.status(404).send("<h2>Customer not found</h2>");
  res.send(customer);
});

//Create request handlers

//Validating the customer
// const validateCustomer = (customer) => {
//   const schema = { title: Joi.string().min(3).required() };

//   return Joi.validate(customer, schema);
// };

//Create New Customer Information
app.post("/api/customers", (req, res) => {
  // const { error } = validateCustomer(req.body);

  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }
  //Some Problem with the Joi package

  //Increment customer id
  const customer = { title: req.body.title, id: customers.length + 1 };

  customers.push(customer);
  res.send(customer);
});

//Updating request handlers

//Updating existing information of the customer
app.put("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === +req.params.id);
  !customer && res.status(404).send("<h1>Customer not found</h1>");

  customer.title = customer.title + req.body.title;
  res.send(customer);
});

//Deleting request handlers
app.delete("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c.id === +req.params.id);
  !customer && res.status(404).send("<h1>Customer not found</h1>");

  customers.splice(customers.indexOf(customer), 1);
  res.send(customer);
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));
