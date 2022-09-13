const { response } = require('express');
const Alumno = require('../models/Alumno');

const obtenerAlumnos = async(req, res = response) => {
    try {
        const alumnos = await Alumno.find({uid: req.uid});
        return res.json({
            alumnos
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error de servidor'
        });
    }
}

const obtenerAlumno = async(req, res = response) => {
    try {
        const { id } = req.params;
        const alumno = await Alumno.findById(id);

        if(!alumno) {
             return res.status(404).json({
                error: "No existe el alumno"
            });
        }
        return res.json({
            alumno
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Error de servidor'
        });
    }
}

const crearAlumno = async (req, res = response) => {
    try {
        const {nombre, apellido, dni} = req.body;
        
        let alumno = await Alumno.findOne({dni});
        

        if(alumno) throw {code: 11000};

        const nuevoAlumno = new Alumno({nombre, apellido, dni});

        await nuevoAlumno.save();

        return res.status(201).json({msg:"Alumno registrado correctamente", nuevoAlumno});
        
    } catch (error) {
        if(error.code === 11000) return res.status(400).json({
            error : "Ya existe un alumno registrado con ese número de DNI"
        });
        return res.status(500).json({
            error: 'Error de servidor'
        });
        
    }
}

const actualizarAlumno = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {nombre, apellido, dni} = req.body;

        const alumno = await Alumno.findById(id);
        

        if(!alumno){
            return res.status(404).json({
                error: "No existe el alumno"
            });
        }

        alumno.nombre = nombre;
        alumno.apellido = apellido;
        alumno.dni = dni;
        

        await alumno.save();
        return res.json({
            msg: "Alumno actualizado correctamente", 
            alumno
        });

    } catch (error) {
        if(error.kind === 'ObjectId') return res.status(403).json({
            error: 'Formato id incorrecto'
        });
       
        return res.status(500).json({
            error: 'Error de servidor'
        });
    }
}

const eliminarAlumno = async(req, res = response) =>{
    try {
        const {id} = req.params;
        const alumno = await Alumno.findById(id);
        if(!alumno){
            return res.status(404).json({
                error: "Alumno no registrado"
            });
        }
        await alumno.remove();
        return res.json({
            msg: "Alumno eliminado correctamente", 
            alumno
        });

    } catch (error) {
        if(error.kind === 'ObjectId') return res.status(403).json({error: 'Formato id incorrecto'});
        return res.status(500).json({error: 'Error de servidor'});
    }
};

module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}