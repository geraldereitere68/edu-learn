/* 
Filename: HighlyComplexCode.js
Description: This code demonstrates a complex implementation of a virtual store with multiple functionalities, including product listing, shopping cart management, user authentication, and order placement.
*/

// Define the product class with properties such as name, price, and quantity
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

// Define the virtual store class which handles all store operations
class VirtualStore {
  constructor() {
    this.products = []; // Array to store available products
    this.cart = []; // Array to store added products
    this.loggedInUser = null; // Stores the currently logged in user
    this.orders = []; // Array to store completed orders
  }

  // Method to add a product to the store
  addProduct(name, price, quantity) {
    this.products.push(new Product(name, price, quantity));
  }

  // Method to list all available products
  listProducts() {
    console.log("Available Products:");
    this.products.forEach((product) => {
      console.log(`- ${product.name} ($${product.price}) [${product.quantity} available]`);
    });
  }

  // Method to add a product to the shopping cart
  addToCart(productName, quantity) {
    const product = this.products.find((p) => p.name === productName);

    if (!product) {
      console.log("Product not found!");
      return;
    }

    if (product.quantity < quantity) {
      console.log(`Insufficient quantity of ${productName} available!`);
      return;
    }

    // Check if the product already exists in the cart
    const existingProduct = this.cart.find((p) => p.name === productName);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push(new Product(productName, product.price, quantity));
    }

    // Reduce the available quantity of the product
    product.quantity -= quantity;
    console.log(`${quantity} ${productName}(s) added to cart.`);
  }

  // Method to remove a product from the shopping cart
  removeFromCart(productName, quantity) {
    const product = this.cart.find((p) => p.name === productName);

    if (!product) {
      console.log(`${productName} not found in cart!`);
      return;
    }

    if (quantity >= product.quantity) {
      this.cart = this.cart.filter((p) => p.name !== productName);
      console.log(`${product.name} removed from cart.`);
    } else {
      product.quantity -= quantity;
      console.log(`${quantity} ${product.name}(s) removed from cart.`);
    }
  }

  // Method to authenticate a user
  login(username, password) {
    // Authenticating logic here...
    this.loggedInUser = username;
    console.log(`Welcome, ${username}! You are now logged in.`);
  }

  // Method to log out the current user
  logout() {
    console.log(`Goodbye, ${this.loggedInUser}! You are now logged out.`);
    this.loggedInUser = null;
  }

  // Method to place an order with the products in the shopping cart
  placeOrder() {
    if (!this.loggedInUser) {
      console.log("Please log in to place an order.");
      return;
    }

    if (this.cart.length === 0) {
      console.log("Your cart is empty. Add some products before placing an order.");
      return;
    }

    // Logic for creating an order and processing the payment
    const totalPrice = this.cart.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const order = {
      products: this.cart,
      total: totalPrice,
      user: this.loggedInUser,
    };

    this.orders.push(order);
    this.cart = [];

    console.log(`Order placed successfully! Total: $${totalPrice}`);
  }
}

// Usage example
const store = new VirtualStore();
store.addProduct("iPhone 12", 999, 10);
store.addProduct("Samsung Galaxy S21", 899, 15);
store.addProduct("Google Pixel 5", 799, 5);

store.listProducts();

store.addToCart("iPhone 12", 3);
store.addToCart("Samsung Galaxy S21", 2);
store.addToCart("Google Pixel 5", 1);

store.removeFromCart("Samsung Galaxy S21", 1);

store.login("example_user", "password");
store.placeOrder();

store.logout();