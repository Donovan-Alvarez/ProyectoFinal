'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'clave_secreta_del_proyecto';

exports.ensureAut = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({message:'La petición no tuene autenticación'});
    }else{
        var token = req.headers.authorization.replace(/['"]+/g,'');
        try{
            var payload = jwt.decode(token, secret);
            if(payload.ex <= moment().unix()){
                return res.status(404).send({message: 'El token ha expirado'});
            }
        }catch(exp){
            return res.status(404).send({message: 'EL token no es valido'});
        }

    }
    req.product = payload;
    next();
}