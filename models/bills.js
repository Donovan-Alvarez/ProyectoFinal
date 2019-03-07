'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaBill = Schema({
    product: {type: Schema.ObjectId, ref: 'Product'},
    client: {type: Schema.ObjectId, ref: 'Client'},
    quantity: String,
    total: String
})

module.exports = mongoose.model('Bill', SchemaBill);