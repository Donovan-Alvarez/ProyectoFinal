'use strict'
var Category = require('../models/categories');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

//Save
function SaveCategory(req,res){
  var category = new Category();
  var params = req.body;

  if(params.title && params.description){
      category.title = params.title;
      category.description = params.description;
      Category.findOne({description: category.description}, (err,issetCategory)=>{
          if(err){
              res.status(500).send({message: 'Error'});
          }else{
              if(!issetCategory){
                      category.save((err, categoryStored)=>{
                          if(err){
                              res.status(500).send({message:'Error al guardar'});
                          }else{
                              if(!categoryStored){
                                  res.status(400).send({message: 'No se pude registrar'});
                              }else{
                                  res.status(200).send({category: categoryStored});
                              }
                          }
                      });
              }else{
                  res.status(500).send({message:'La categoria no puede repetirse'});
              }
          }
      });
  }else{
      res.status(500).send({message:'Introduce los datos requeridos'});
  }
}
//Delete
function DeleteCategory(req,res){
    var id = req.params.id;
    Category.findByIdAndDelete({_id:id},(err,Category)=>{
        if(err){
            res.status(500).send({message:'Error al eliminar'});
        }else{
            res.status(200).send({Category, message:'Esta Categoria ha sido eliminado'});
        }
    });
}
//Update
function UpdateCategory(req,res){
    var id = req.params.id;
    var update = req.body;
    Category.findByIdAndUpdate(id, update, {new: true}, (err,CategoryUpdate)=>{
        if(err){
            res.status(500).send({message: 'Erro al actualizar'});
        }else{
            if(!CategoryUpdate){
                res.status(404).send({message:'No se ha podido actualizar'});
            }else{
                res.status(200).send({category: CategoryUpdate});
            }
        }
    });
}
//List
function ListarCategory(req,res){
    Category.find({}, (err, categoria)=>{
        if(err){
            res.status(500).send({message: 'Error al listar'});
        }else{
            res.status(200).send(categoria);
        }
    });
}
//login
function LoginCategory(req,res){
    var params = req.body;
    var title = params.title;
    Category.findOne({title: title},(err,categoria)=>{
        if(err){
            res.status(500).send({message:'Error al intentar iniciar sesión'});
        }else{
            if(categoria){
                    if(params.gettoken){
                        res.status(200).send({
                            token: jwt.createToken(categoria)
                        });
                    }else{
                        res.status(200).send(categoria);
                    }
            }else{
                res.status(404).send({message:'No se ha podido encontrar la categoria'});
            }
        }
    });
}
module.exports = {
    SaveCategory,
    DeleteCategory,
    UpdateCategory,
    ListarCategory,
    LoginCategory
}