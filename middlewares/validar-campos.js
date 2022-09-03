
const { validarCampos, check } = require('../middlewares/validationResult');

const validarCamposRegistro = 
[   //middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres como mínimo').isLength({min: 6}),
    validarCampos
];


const validarCamposLogin = 
[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 caracteres como mínimo').isLength({min:6}),
    validarCampos
];

module.exports = {
    validarCamposLogin,
    validarCamposRegistro
}