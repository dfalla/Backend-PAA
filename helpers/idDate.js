// express-validator no puede validar fechas, para validar fechas necesitamos moment




const moment = require('moment');

const isDate = ( value, { req, location, path } ) => {
   
    if( !value ){
    return false;
   }

   //Esto le va a decir a express-validator que si isDate retorna false quiere decir que ese campo (campo de fecha) no es correcto, por lo cual la validación va a fallar

   const fecha = moment( value );

   if( fecha.isValid() ){
    return true;
   } else {
    return false;
   }
}


module.exports = {
    isDate
}