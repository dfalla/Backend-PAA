/* 
    Rutas de estudiantes / Auth
    host + /api/students
*/

const express = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { 
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno } = require('../controllers/student');
const { validarAlumno } = require('../middlewares/validar-campos-alumno');
const router = express.Router();

router.use( validarJWT );

router.get('/', obtenerAlumnos);
router.get('/:id', obtenerAlumno);
router.post('/', validarAlumno, crearAlumno);
router.put('/:id', validarAlumno ,actualizarAlumno);
router.delete('/:id', eliminarAlumno);


module.exports = router;