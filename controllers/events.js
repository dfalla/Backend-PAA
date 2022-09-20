const { response } = require('express');
const Evento = require('../models/Evento');

// curso especializado de node
// los filtros y paginación se hacen en los controladores, en la función que trae toda la data de golpe, en este caso obtenerEventos (todos)

const obtenerEventos = async(req, res = response) => {

    //traer todos los eventos con el nombre y el id del usuario
    const eventos = await Evento.find().populate('user', 'name');
    

    res.json({
        ok:true,
        eventos
    })
}

const crearEvento = async(req, res = response) => {

    //Verificar que tenga el evento.
    const evento = new Evento( req.body );

    try {
        
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            msg: "Nota creada satisfactoriamente",
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

const actualizarEvento = async (req, res = response) => {
    //obtenemos el id del evento

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe por ese id"
            })
        }

        // Verificar que sea la misma persona que creo el evento

        if ( evento.user.toString() !== uid){
           return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio para editar esta nota"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

        res.json({
            ok: true,
            msg:'Evento actualizado correctamente',
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error del servidor, hable con el administrador"
        })
    }

}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Evento.findById(eventoId);

        if( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: "El evento no existe por ese id"
            })
        }

        if ( evento.user.toString() !== uid){
            return res.status(401).json({
                 ok: false,
                 msg: "No tiene privilegio para eliminar esta nota"
             })
        }

        // await evento.remove();
        await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            msg: "Nota eliminada correctamente"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error del servidor, hable con el administrador"
        })
    }
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}