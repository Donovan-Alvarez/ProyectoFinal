'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_del_proyecto';


//NodeJs Cors
exports.createToken = function(product){
    var payloadP = {
        sub: product._id,
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payloadP, secret);
}