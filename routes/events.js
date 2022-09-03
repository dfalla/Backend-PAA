/* 
    Rutas de usuarios / Auth
    host + /api/events

*/

const express = require('express');
const { 
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarEvento } = require('../middlewares/validar-campo-evento');
const router = express.Router();


// Proteger todas las rutas con validarJWT, en caso de que quiera una ruta que se pública entoces movemos router.use( validarJWT ) debajo de la ruta que queremos que sea pública

router.use( validarJWT );


router.get('/', obtenerEventos);
router.post('/', validarEvento, crearEvento);
router.put('/:id', validarEvento ,actualizarEvento);
router.delete('/:id', eliminarEvento);


module.exports = router;