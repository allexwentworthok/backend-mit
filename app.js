var express = require('express')
var mongoose=  require('mongoose')

var app = express();

// Importar rutas 
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoute = require('./routes/login')

app.use('/', appRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoute);

// Conexión a base de datos
mongoose.connection.openUri('mongodb://localhost:27017/mitExample', (err, res) => {
    if (err) throw err;
    console.log('Base de datos online')
})

//App listen
app.listen(3000, () =>{
    console.log('Express en server puerto 3000')
})
