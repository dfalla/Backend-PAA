const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const { dbConnection } = require('./database/config');
const AUTH = require('./routes/auth');
const EVENTS = require('./routes/events');
dotenv.config();

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use( cors() );


//Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Rutas

//TODO: auth // crear, login, renew
app.use('/api/auth', AUTH);

//Ruta de eventos
app.use('/api/events', EVENTS);
//TODO: CRUD: eventos

app.use('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})



// Escuchar peticiones

const PORT = process.env.PORT || 4001;

app.listen( PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ PORT }`);
} );