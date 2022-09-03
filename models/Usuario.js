const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true},
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor complete una dirección de correo electrónico válida']
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model( 'Usuario', UsuarioSchema );