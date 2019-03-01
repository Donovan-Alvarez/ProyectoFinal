'use strict'
var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');

//Save
function SaveUser(req,res){
    var user = new User();
    var params = req.body;

    if(params.password && params.name && params.surname && params.email){
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.rol = params.rol;
        User.findOne({email: user.email}, (err,issetUser)=>{
            if(err){
                res.status(500).send({message: 'Error, hay problemas en el usuario'});
            }else{
                if(!issetUser){
                    bcrypt.hash(params.password, null, null, function(err,hash){
                        user.password = hash;
                        user.save((err, userStored)=>{
                            if(err){
                                res.status(500).send({message:'Error al guardar'});
                            }else{
                                if(!userStored){
                                    res.status(400).send({message: 'No se pude registrar'});
                                }else{
                                    res.status(200).send({user: userStored});
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

//Delete
function DeleteUser(req,res){
    var id = req.params.id;
    if(req.user.rol === 'cliente'){
    User.findByIdAndDelete({_id:id},(err,User)=>{
        if(err){
            res.status(500).send({message:'Error al eliminar'});
        }else{
            res.status(200).send({User, message: 'Este usuario fue eliminado'});
        }
    });
}else{
    res.status(500).send({message: 'El usuario no es cliente para que pueda eliminar'});
}
}

//Login
function LoginUser(req,res){
    var id = req.params.id;
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email},(err,user)=>{
        if(err){
            res.status(500).send({message:'Error al intentar iniciar sesión'});
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err,check)=>{
                    if(check){
                    if(params.gettoken){
                        res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        res.status(200).send(user);
                    }
                }else{
                    res.status(404).send({message:'El usuario no ha podido logearse'});
                }
                });
            }else{
                res.status(404).send({message:'No se ha podido encontrar el usuario'});
            }
        }
    });
}

// Update
function UpdateUser(req,res){
    var id = req.params.id;
    var update = req.body;
    if(req.user.rol === 'cliente'){
    if(id != req.user.sub){
        res.status(500).send({message:'No tiene permiso para actulizar este usuario'});
    }
    User.findByIdAndUpdate(id, update, {new: true}, (err, UserUpdate)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar'});
        }else{
            if(!UserUpdate){
                res.status(404).send({message:'No se ha podido actualizar'});
            }else{
                res.status(200).send({user: UserUpdate});
            }
        }
    });
}else{
    res.status(500).send({message:'Este usuario no es cliente para actualizar'});
}
}

//List
function ListUser(req,res){
    User.find({}, (err,user)=>{
        if(err){
            res.status(500).send({
                message:'No se pudo listar'
            });
        }else{
            res.status(200).send(user);
        }
    })
}

module.exports ={
    SaveUser,
    DeleteUser,
    LoginUser,
    UpdateUser,
    ListUser
}