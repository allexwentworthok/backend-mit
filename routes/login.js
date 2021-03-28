var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const app = express();
var SEED = require('../config/config');
var Usuario = require('../models/usuario');

//Autentificación Normal

app.post('/', (req, res) => {
    var body = req.body;

    Usuario.findOne({ email: body.email, role: body.role}, (err, usuarioDB) =>{

        if (err) {
            return res.status(500).json({
                ok:false,
                mensaje:'Error al buscar usuario',
                errros: err
            });
        }

        if(!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas, No estas autorizado',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok:false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear Token
        var token = jwt.sign({ usuario : usuarioDB}, SEED, { expiresIn: 288000 }); // Expira en 8hs

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        })

    })


})

module.exports = app;