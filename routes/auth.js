/* 
    Rutas de usuarios / Auth
    host + /api/auth

*/

const express = require('express');
const {  validarCamposLogin, validarCamposRegistro } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = express.Router();
const {
    crearUsuario, 
    loginUsuario,
    revalidarToken
} = require('../controllers/auth');


router.post('/new',validarCamposRegistro, crearUsuario);

router.post('/',validarCamposLogin, loginUsuario);

router.get('/renew', validarJWT ,revalidarToken);



module.exports = router;