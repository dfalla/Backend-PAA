const mongoose = require('mongoose');

const {Schema, model} = mongoose;


const AlumnoSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    apellido:{
        type: String,
        required: true,
        trim: true
    },
    dni:{
        type: String,
        required: true,
        trim: true
    }
    // user: {
    //     // esto le va a decir a mongoose que va a ser una referencia
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Usuario', //nombre del schema de usuario
    //     required: true
    // }
});

module.exports = mongoose.model('Alumno', AlumnoSchema);