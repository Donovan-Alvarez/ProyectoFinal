'use strict'
var Client = require('../models/clients');
var Product = require('../models/products');
var Category = require('../models/categories');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

//Save
function SaveClient(req,res){
    var client = new Client();
    var params = req.body;

    if(params.password && params.name && params.surname && params.email){
        client.name = params.name;
        client.surname = params.surname;
        client.email = params.email;
        client.rol = 'CLIENTE';
        Client.findOne({email: client.email}, (err,issetClient)=>{
            if(err){
                res.status(500).send({message: 'Error, hay problemas en el usuario'});
            }else{
                if(!issetClient){
                    bcrypt.hash(params.password, null, null, function(err,hash){
                        client.password = hash;
                        client.save((err, ClientStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar'});
                            }else{
                                if(!ClientStored){
                                    res.status(400).send({message: 'No se pude registrar'});
                                }else{
                                    res.status(200).send({Client: ClientStored});
                                }
                            }
                        });
                    });
                }else{
                    res.status(500).send({message:'El usuario no puede repetirse'});
                }
            }
        });
    }else{
        res.status(500).send({message:'Introduce los datos requeridos'});
    }
}
//Buscar Product
function buscarProduct(req,res){
    var title = req.params.title;
    Product.find({title},(err,producto)=>{
        if(err){
            res.status(500).send({message: 'Error al buscar el producto'});
        }else{
            res.status(200).send(producto);
        }
    });
}
//delete
function DeleteClient(req,res){
    var id = req.params.id;
    Client.findByIdAndDelete({_id:id},(err,client)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar'});
        }else{
            res.status(200).send({client, message: 'Este cliente fue eliminado'});
        }
    });
}
//update
function UpdateClient(req,res){
    var id = req.params.id;
    var update = req.body;
    Client.findByIdAndUpdate(id, update, {new: true}, (err, clienteUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar'});
        }else{
            if(!clienteUpdate){
                res.status(404).send({message:'No se ha podido actualizar'});
            }else{
                res.status(200).send({client: clienteUpdate});
            }
        }
    });
}
//Ver Producto por su categoria
function ProdCate (req,res){
    var title = req.params.title;
    Product.find({category: title},(err,categoria)=>{
        if(err){
            res.status(500).send({message: 'Error al listar los alumnos'});
        }else{
            res.status(200).send(categoria);
        }
    })
}
//Carrito
function AddCarr(req,res){
    var product = new Product();
    var params = req.params.id;


    product.save(params,(err,carr)=>{
        if(err){
            res.status(500).send({message: 'No se pudo guardar'});
        }else{
            if(!carr){
                res.status(404).send({message: 'No se encuentra'});
            }else{
                res.status(200).send({carr});
            }
        }
    });
}
//Login
function LoginClient(req,res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    Client.findOne({email: email},(err,cliente)=>{
        if(err){
            res.status(500).send({message:'Error al intentar iniciar sesión'});
        }else{
            if(cliente){
                bcrypt.compare(password, cliente.password, (err,check)=>{
                    if(check){
                    if(params.gettoken){
                        res.status(200).send({
                            token: jwt.createToken(cliente)
                        });
                    }else{
                        res.status(200).send(cliente);
                    }
                }else{
                    res.status(404).send({message:'El cliente no ha podido logearse'});
                }
                });
            }else{
                res.status(404).send({message:'No se ha podido encontrar el cliente'});
            }
        }
    });
}

function list(req,res){
    Client.find({}, (err,cl)=>{
        if(err){
            res.status(500).send({message: 'Error'});
        }else{
            res.status(200).send(cl);
        }
    });
}
module.exports = {
    SaveClient,
    buscarProduct,
    DeleteClient,
    UpdateClient,
    ProdCate,
    AddCarr,
    LoginClient,
    list
}