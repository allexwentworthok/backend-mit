var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    mensaje: '{VALUE} no es un rol permitido'
};

var usuarioSchema = new Schema({
    nombre : { type: String, required: [true, 'El nombre del usuario es requerido']},
    email : {type: String, unique:true, required: [true, 'El email es requerido']},
    password : {type: String, required:[true, 'La contraseña es requerida']},
    role: {type: String, required:true, default:'USER_ROLE', enum: rolesValidos}
})

usuarioSchema.plugin(uniqueValidator, { mensaje: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);