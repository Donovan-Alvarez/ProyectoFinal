'use strict'

var express = require('express');
var UserController = require('../controllers/users');
var CategoryController = require('../controllers/categories');
var productController = require('../controllers/products');
var md_auth = require('../midellwares/authenticated');
var api = express.Router();

//user
api.post('/save', UserController.SaveUser);
api.delete('/delete/:id',md_auth.ensureAut, UserController.DeleteUser);
api.get('/login', UserController.LoginUser);
api.put('/update/:id',md_auth.ensureAut, UserController.UpdateUser);
api.get('/list', UserController.ListUser);
//category
api.post('/save-category', CategoryController.SaveCategory);
api.delete('/delete-category/:id', CategoryController.DeleteCategory);
api.put('/update-category/:id', CategoryController.UpdateCategory);
api.get('/list-category', CategoryController.ListarCategory);
api.get('/login-category', CategoryController.LoginCategory);
//Product
api.post('/save-product', md_auth.ensureAut, productController.SaveProduct);
api.delete('/delete-product/:id', productController.DeleteProduct);
api.put('/update-product/:id', productController.UpdateProduct);
api.get('/list-product', productController.ListProduct);
api.post('/controlStock/:id', productController.ControlStock)
module.exports = api;