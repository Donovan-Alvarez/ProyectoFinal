'use strict'
var Purchases = require('../models/purchases');
var Product = require('../models/products');

function saveCompra(req,res){
    var purchase = new Purchases();
    
    purchase.save((err,guardar)=>{
        if(err){
            res.status(500).send({message: 'No se puede guardar el carrito'});
        }else{
            if(!guardar){
                res.status(404).send({message: 'Error al guardar el carrito'});
            }else{
                res.status(200).send({carrito: guardar});
            }
        }
    });
}
function agregarProducto(req, res) {
    var purchase = new Purchases();
    var id = req.params.id;
    var idProduct = req.params.idProduct;
    var params = req.body;
    //var restarCantidad = cant - c;
    var cliente = req.params.idCliente;
    var producto = req.product.sub;
    var precio = req.product.price; 
    var cant = params.cantidad;
    var stock = req.product.stock;

    console.log(cant);
    console.log(stock);

    /*\if (req.product.stock > 0) {
        //if (cant <= c) {
        Product.findByIdAndUpdate(idProduct, { stock: stock - cant }, (err, act) => {
            if (err) {
                res.status(500).send({ message: 'No se puede actualizar el stock' });
            } else {
                Purchases.findByIdAndUpdate(id, { $push: { compra: { product: producto, price: precio, stock: stock - cant, client: cliente, cantidad: cant } } }, { new: true }, (err, updat) => {
                    if (err) {
                        res.status(500).send({ message: 'No se puede registrar la respuesta a la encuesta' });
                    } else {
                        res.status(200).send({ act, compra: updat });
                    }
                });
            }
        });
        //}else {
        // res.status(200).send({message: 'No puede comprar mas productos de los existentes'});            
        //}
    } else {
        res.status(200).send({ message: 'El producto seleccionado está agotado' })
    }*/
}

function SavePurchases(req,res){
    var purchases = new Purchases();
    var params = req.body;

    if( params.client && params.quantity){
        purchases.product = req.user.sub;
        purchases.client= req.body.id;
        purchases.quantity = params.quantity;
        purchases.total = params.total;
        Purchases.findOne({quantity: purchases.quantity}, (err,issetpurchases)=>{
            if(err){
                res.status(500).send({message: 'Error, hay problemas en el producto'});
            }else{        
                if(!issetpurchases){
                    purchases.save((err, purchasesStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar'});
                            }else{
                                if(!purchasesStored){
                                    res.status(400).send({message: 'No se pude registrar'});
                                }else{
                                    //if(stock -=5){
                                        res.status(200).send({purchases: purchasesStored});
                                    //}
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

module.exports = {
    SavePurchases,
    saveCompra,
    agregarProducto
}

