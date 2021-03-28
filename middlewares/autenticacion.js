var verify = require('jsonwebtoken');
var SEED = require('../config/config');

//Validar el token 

export function verificarToken(req, res, next) {
    var token = req.query.token;

    verify(token, SEED, (err, decoded) => {

        if (err){
            return res.status(401).json({
                ok:false,
                mensaje: 'Token incorrecto',
                errors: err
            })
        }

        req.usuario = decoded.usuario;

        next();
    })
}