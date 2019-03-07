'use strict'

var express = require('express');
var ClienteController = require('../controllers/clients');
var PurchasesController = require('../controllers/purchases');
var BillController = require('../controllers/bills');
var md_auth = require('../midellwares/authenticated');
var md_authP = require('../midellwares/authenticatedP');
var api = express.Router();

api.post('/save-client', ClienteController.SaveClient);
api.get('/buscarProduct/:title', ClienteController.buscarProduct);
api.delete('/delete-client/:id', ClienteController.DeleteClient);
api.put('/update-client/:id', ClienteController.UpdateClient);
api.get('/productocate/:title',md_auth.ensureAut, ClienteController.ProdCate);
api.post('/login-client', ClienteController.LoginClient); 
api.get('/listCliente', ClienteController.list);
//Compra
api.post('/save-compra',md_auth.ensureAut,PurchasesController.SavePurchases);
api.post('/agregarCarrito',PurchasesController.saveCompra);
api.post('/agregarProducto/:id/:idProducto/:idCliente',md_authP.ensureAut,PurchasesController.agregarProducto);
api.post('/addcarr/:id', ClienteController.AddCarr);
//Bills
api.post('/save-bill/:id',md_auth.ensureAut, BillController.SaveBill);
api.get('/verFactura',md_auth.ensureAut,BillController.visualizar);
api.get('/productforBill',md_auth.ensureAut,BillController.productfac);
api.get('/reportebill', BillController.listbill);
module.exports = api;