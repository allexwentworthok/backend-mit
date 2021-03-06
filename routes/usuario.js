var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var app = express();

var Usuario = require('../models/usuario');
// ----------------------------------
//Obtener usuario de la Base de datos
// ----------------------------------

app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre email role')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(404).json({
                        ok: false,
                        errors: err
                    })
                }

                Usuario.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    })
                })
            } 
        )

})


// ----------------------------------
// Crear usuario en la Base de datos
// ----------------------------------
app.post('/createUser', (req, res) => {

    console.log('Entro',req)
    var usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });

    console.log('Entro',req)


    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }
        res.status(201).json({
            ok:true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        })
    })
})

// ----------------------------------
// Actualiza usuario en la Base de datos
// ----------------------------------

app.post('/updateUser', (req, res, next)=>{
    var updateValues = req.body;
    Usuario.find({"email": req.body.email}, (err, usuarios)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                mensaje: 'Error al buscar usuario para actualizar',
                errors: err
            })
        }
        if (usuarios.length == 0){
            return res.status(400).json({
                ok:false,
                mensaje: 'Usuario no encontrado',
                errors: err
            })
        }
        Usuario.findByIdAndUpdate(usuarios[0].id, updateValues, function(err, usuarioGuardado) {
            if (err) {
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                })
            }
            res.status(200).json({
                ok:true,
                usuario: usuarioGuardado,
                usuarioToken: req.usuario
            })
        })
    })    
})

module.exports = app;

