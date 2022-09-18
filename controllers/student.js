const { response } = require('express');
const { uploadImage, deleteImage } = require('../libs/cloudinary');
const fs = require('fs-extra');
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

        const {nombre, apellido, dni, fecha_ingreso} = req.body;
        let image;

        if(req.files.imagen){
           const result = await uploadImage(req.files.imagen.tempFilePath);
           //eliminar de la carpeta upload los archivos una vez que se han subido a cloudinary
           await fs.remove(req.files.imagen.tempFilePath);
           image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        
        let alumno = await Alumno.findOne({dni});
        
        if(alumno) throw {code: 11000};

        const nuevoAlumno = new Alumno({nombre, apellido, dni, fecha_ingreso, image});
        
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
        const {nombre, apellido, dni, fecha_ingreso} = req.body;
        

        const alumno = await Alumno.findById(id);
        

        if(!alumno){
            return res.status(404).json({
                error: "No existe el alumno"
            });
        }

        alumno.nombre = nombre;
        alumno.apellido = apellido;
        alumno.dni = dni;
        alumno.fecha_ingreso = fecha_ingreso;
        

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
        
        if(alumno.image.public_id){
            await deleteImage(alumno.image.public_id);
        }

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
    eliminarAlumno,
}