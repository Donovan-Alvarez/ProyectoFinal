'use strict'
var Product = require('../models/products');
var jwt = require('../services/jwt');

//Save
function SaveProduct(req,res){
    var product = new Product();
    var params = req.body;

    if(params.title && params.description && params.stock){
        product.title = params.title;
        product.description = params.description;
        product.stock = params.stock;
        product.price = params.price;
        product.category = params.category;
        Product.findOne({title: product.title}, (err,issetproduct)=>{
            if(err){
                res.status(500).send({message: 'Error, hay problemas en el producto'});
            }else{
                if(!issetproduct){;
                        product.save((err, productStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar'});
                            }else{
                                if(!productStored){
                                    res.status(400).send({message: 'No se pude registrar'});
                                }else{
                                    res.status(200).send({product: productStored, message:'Producto Agotado'});
            
                                }
                            }
                        });
                }else{
                    res.status(500).send({message:'El producto no puede repetirse'});
                }
            }
        });
    }else{
        res.status(500).send({message:'Introduce los datos requeridos'});
    }
}
//Delete
function DeleteProduct(req,res){
    var id = req.params.id;
    Product.findByIdAndDelete({_id:id},(err,product)=>{
        if(err){
            res.status(500).send({message: 'Error al eliminar'});
        }else{
            res.status(200).send({product, message: 'Este producto fue eliminado'});
        }
    });
} 
//Update
function UpdateProduct(req,res){
    var id = req.params.id;
    var update = req.body;
    Product.findByIdAndUpdate(id, update, {new: true}, (err, productUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar'});
        }else{
            if(!productUpdate){
                res.status(404).send({message:'No se ha podido actualizar'});
            }else{
                res.status(200).send({product: productUpdate});
            }
        }
    });
}
//list
function ListProduct(req,res){
    Product.find({}, (err,product)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar'});
        }else{
            res.status(200).send(product);
        }
    });
}

//Stock
function Token(req, res) {
    var params = req.body;
    var title = params.title;

    Product.findOne({ title: title }, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'Error al intentar iniciar sesión' });
        } else {
            if (product) {
                        if (params.gettoken == 'true') {
                            res.status(200).send({
                                token: jwt.createToken(product)
                            });
                        } else {
                            res.status(200).send({ product })
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' });
                    }
        }
    });
}
//Control Stock

function ControlStock(req,res){
    var product = new Product();
    var id = req.params.id;
    var update = req.body;

    if(update.stock){
        product.stock = update.stock;
    
    Product.findByIdAndUpdate(id,update,{new:true},(err,edit)=>{
        if(err){
            res.status(500).send({message: 'No se puede editar el stock'});
        }else{
            if(!edit){
                res.status(404).send({message: 'El identificador no coincide'});
            }else{
                res.status(200).send({edit});
            }
        }
    });
}else{
    res.status(200).send({message: 'No puede modificar otro parametro'});
}
}

module.exports = {
    SaveProduct,
    DeleteProduct,
    UpdateProduct,
    ListProduct,
    Token,
    ControlStock
}