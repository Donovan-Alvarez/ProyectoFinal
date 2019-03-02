'use strict'

var express = require('express');
var ClienteController = require('../controllers/clients');
var md_auth = require('../midellwares/authenticated');
var api = express.Router();

api.post('/save-client', ClienteController.SaveClient);
api.get('/buscarProduct/:title', ClienteController.buscarProduct);
api.delete('/delete-client/:id', ClienteController.DeleteClient);
api.put('/update-client/:id', ClienteController.UpdateClient);

module.exports = api;