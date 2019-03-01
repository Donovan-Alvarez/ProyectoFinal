'use strict'

var express = require('express');
var UserController = require('../controllers/users');
var CategoryController = require('../controllers/categories');
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

module.exports = api;