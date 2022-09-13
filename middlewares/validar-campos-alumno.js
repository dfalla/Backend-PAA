const {validarCampos, check} = require('../middlewares/validationResult');

const validarAlumno = [
    check("nombre", "Ingrese un nombre válido")
        .trim()
        .notEmpty(),
    check("apellido", "Ingrese un apellido válido")
        .trim()
        .notEmpty(),
    check("dni", "Ingrese un número de dni válido")
        .trim()
        .notEmpty()
        .isLength({min:8, max:8}),
        validarCampos,
]

module.exports = {
    validarAlumno
}