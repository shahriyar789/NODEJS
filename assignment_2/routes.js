const express = require('express');
const router = express.Router();
const productsService = require('./productsService');
const ordersService = require('./ordersService');
const customersService = require('./customersService');

// Products Routes
router.get('/products', productsService.getProducts);
router.post('/products', productsService.addProduct);
router.put('/products/:id', productsService.updateProduct);
router.delete('/products/:id', productsService.deleteProduct);

// Orders Routes
router.get('/orders', ordersService.getOrders);
router.post('/orders', ordersService.addOrder);
router.put('/orders/:id', ordersService.updateOrder);
router.delete('/orders/:id', ordersService.deleteOrder);

// Customers Routes
router.get('/customers', customersService.getCustomers);
router.post('/customers', customersService.addCustomer);
router.put('/customers/:id', customersService.updateCustomer);
router.delete('/customers/:id', customersService.deleteCustomer);

module.exports = router;






















































