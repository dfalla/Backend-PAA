const { isDni } = require('../helpers/isDni');
const { isDate } = require('../helpers/isDate');
const {validarCampos, check} = require('../middlewares/validationResult');

const validarAlumno = [
    check("nombre", "Ingrese un nombre válido")
        .isString()
        .trim()
        .notEmpty(),
    check("apellido", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    // check("fecha_ingreso", "Fecha de ingreso es obligatorio")
    //     .custom( isDate ),
    check("dni", "Ingrese un número de DNI válido")
        .trim()
        .notEmpty()
        .custom(isDni)
        .isLength({min:8, max:8}),
    validarCampos,
]

module.exports = {
    validarAlumno
}