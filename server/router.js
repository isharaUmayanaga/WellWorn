const express = require('express');
const router = express.Router();
const contraller = require('./contraller');
const { route } = require('./app');

const catagoryContraller = require('./CatagoryController');
const customerContraller = require('./CustomerController');
const orderContraller = require('./OrderController');
const productContraller = require('./ProductController'); 

router.get('/users',contraller.getUsers);
router.post('/createuser',contraller.addUser);
router.post('/updateuser',contraller.updateUser);
router.post('/deleteuser',contraller.deleteUser);


//category
router.get('/categories',catagoryContraller.getCategories);
router.post('/addcategories',catagoryContraller.addCategory);
router.post('/deletecategories/:id',catagoryContraller.deleteCategory);
router.post('/updatecategory/:id', catagoryContraller.updateCategory);

//customer
router.get('/customer',customerContraller.getCustomer);
router.post('/addcustomer',customerContraller.addCustomer);
router.post('/updatecustomer',customerContraller.updateCustomer);
router.post('/deletecustomer',customerContraller.deleteCustomer);
router.get('/customer/:userId', customerContraller.getCustomerById);

//order
router.get('/orders',orderContraller.getOrders);
router.post('/addorders',orderContraller.addOrders);
router.post('/updateorders',orderContraller.updateOrder);
router.post('/deleteorders',orderContraller.deleteOrder);

//product
router.get('/product',productContraller.getProducts);
router.post('/addprodct',productContraller.addProducts);
router.post('/updateproduct',productContraller.updateProduct);
router.post('/deleteproduct',productContraller.deleteproduct);


module.exports = router;