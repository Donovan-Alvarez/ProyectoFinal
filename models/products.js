'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
     title: String,
     description: String,
     stock: Number,
     price: Number,
     category: String
})

module.exports = mongoose.model('Products', ProductSchema);