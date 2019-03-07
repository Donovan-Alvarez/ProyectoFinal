'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaPurchase = Schema({
    compra: [{product: {type: Schema.ObjectId, ref: 'Product'}, price: String, stock: String, client: {type: Schema.ObjectId, ref: 'Client'},cantidad: String}],
})

module.exports = mongoose.model('Purchase', SchemaPurchase);