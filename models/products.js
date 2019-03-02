'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
     title: String,
     description: String,
     stock: Number,
     category: {type: Schema.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Products', ProductSchema);