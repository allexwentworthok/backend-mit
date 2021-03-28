var express = require('express')
var mongoose=  require('mongoose')
var bodyParser = require('body-parser')

var app = express();

// Habilitar el CORS 
app.use(function(req,res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
})

//app.use(bodyParser.urlencode({ extended: false }))
//app.use(bodyParser.json())

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
