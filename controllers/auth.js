const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


//req -> lo que la persona solicita
//res -> lo que el servidor responde

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;
    
    try {

        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado, por favor intente con otro correo'
            })
        }
        

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);


    
        res.status(201).json({
            ok: true,
            msg: 'Usuario registrado exitosamente',
            uid: usuario.id,
            name: usuario.name,
            token

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            status: 500,
            msg: 'Por favor hable con el administrador'
        })
    }
};


const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña no son correctos'
            })
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario y/o contraseña no son correctos'
            });
        } 

        // Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok:true,
            msg: 'Usuario Logueado',
            uid: usuario.id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

const revalidarToken = async(req, res = response) => {

    const { uid, name } = req;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok: true, 
        name,
        uid,
        token
        
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}