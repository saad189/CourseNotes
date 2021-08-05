const db = require("./db");
const mail = require("./mail");

//Testing Numbers:

module.exports.absolute = function (number) {
  return number >= 0 ? number : -number;
};

// Testing Strings

module.exports.greet = function (name) {
  return "Welcome " + name;
};

// Testing arrays:

module.exports.getCurrencies = function () {
  return ["USD", "AUD", "EUR"];
};

// Testing Objects:

module.exports.getProduct = function (productId) {
  return { id: productId, price: 10 };
};

// Testing Exceptions:

module.exports.registerUser = function (username) {
  if (!username) throw new Error("Username is required");
  return { id: new Date().getTime(), username: username };
};

// Testing Mock Functions

module.exports.applyDiscount = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  if (customer.points > 10) order.totalPrice *= 0.9;
};

// Mock function Interaction

module.exports.notifyCustomers = function (order) {
  const customer = db.getCustomerSync(order.customerId);
  mail.send(customer.email, "Your order has been placed");
};
