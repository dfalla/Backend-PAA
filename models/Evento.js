const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    },
    //usuario que creo el registro
    user: {
        // esto le va a decir a mongoose que va a ser una referencia
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', //nombre del schema de usuario
        required: true
    }

});

//SERIALIZAR PARA QUE NO SE REGISTRE COMO _id EN LA MONGODB

EventoSchema.method('toJSON', function() {
    //con esto tengo referencia a todo el objeto que se está serializando para que en el postman no aparezcan el __v y el _id se reemplace por id simplemente, en mongoDB normal se crea con el __v y el _id
    
   const{ __v, _id, ...object } =  this.toObject();
   object.id = _id;

   return object;
});
module.exports = mongoose.model('Evento', EventoSchema);