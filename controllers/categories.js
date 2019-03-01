'use strict'
var Category = require('../models/categories');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

//Save
function SaveCategory(req, res){
    var category = new Category();
    var params = req.body;
  
    if (params.title && params.description){
        category.name = params.title;
        category.surname = params.description;
          Category.findOne({title: category.title}, (err, issetcategory) =>{
  
            if(err){
              res.status(500).send({message: 'Error'});
            }else{
              if(!issetcategory){
                  category.save((err, CategoryStored) => {
                    if(err){
                      res.status(500).send({message: 'error al guardar'});
                    }else{
                      if(!CategoryStored){
                        res.status(404).send({message: 'no se pudo registrar el usuario'});
                      }else{
                        res.status(200).send({category: CategoryStored});
                      }
                    }
                  });
              }else{
                  res.status(200).send({message: 'no puede repetise la categoria'});
                  }
              }
            });
            }else{
              res.status(200).send({message: 'intoduce los datos correctamente'});
              }
            }

module.exports = {
    SaveCategory
}