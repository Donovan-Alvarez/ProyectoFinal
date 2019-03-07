'use strict'
var Bills = require('../models/bills');
var Product = require('../models/products');

function SaveBill(req,res){
    var bills = new Bills();
    var params = req.body;

    if(params.quantity){
        bills.product = req.params.id;
        bills.client= req.user.sub;
        bills.quantity = params.quantity;
        bills.total = params.total;
        Bills.findOne({quantity: bills.quantity}, (err,issetbills)=>{
            if(err){
                res.status(500).send({message: 'Error, hay problemas'});
            }else{        
                if(!issetbills){
                    bills.save((err, billsStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar'});
                            }else{
                                if(!billsStored){
                                    res.status(400).send({message: 'No se pude registrar'});
                                }else{
                                        res.status(200).send({bills: billsStored});
                                }
                            }
                        });
                }else{
                    res.status(500).send({message:'La factura no puede repetirse'});
                }
            }
        });
    }else{
        res.status(500).send({message:'Introduce los datos requeridos'});
    }
}
//MostrarFactura
function visualizar(req,res){
    var id = req.user.sub;
    Bills.find({client: id},(err,factura)=>{
        if(err){
            res.status(500).send({message:'No se pueden ver las facturas'});
        }else{
            res.status(200).send({factura});
        }
    });
}
//Productos por factura
function productfac(req,res){
    var idB = req.user.sub;
    Product.find({bills: idB},(err,product)=>{
        try{
            res.status(200).send(product);
        }catch(err){
            res.status(500).send({message:'Error'});
        }
    });
}

module.exports = {
    SaveBill,
    visualizar,
    productfac
}