const {validarCampos, check} = require('../middlewares/validationResult');
const { isDate } = require('../helpers/isDate'); 

const validarEvento = [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    //express-validator no puede validar fechas, utilizamos el custom le mandamos un callback
    check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
]

module.exports = {
    validarEvento
}