'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3580;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ProyectoFinal', {useNewUrlParser: true})

.then((err,res)=>{
    console.log('Conexión a la base de datos');

    app.listen(port, ()=>{
        console.log('Conexión al servidor');
    });
})
.catch(err => console.log(err));
