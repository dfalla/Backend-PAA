const { v2 } = require('cloudinary');
const { verify } = require('jsonwebtoken');

//especificar la cuenta a donde vamos a subir los archivos
v2.config({
    //encontramos estos datos en dashboard
    cloud_name: "dlbsdgti4",
    api_key: "788452112121486",
    api_secret: "f6poooy3tdG9-3wKUvk6ucRn5lM"
})
const uploadImage = async(filePath) => {
    // filePath puede ser el archivo, la ruta donde está el archivo o incluso el string del archivo o un dato crudo del archivo
    //subir el archivo a los servicios de cloudinary
    return await v2.uploader.upload(filePath, {
        folder: 'students' //nombre de la carpeta que está en cloudinary
    });
}

const deleteImage = async(public_id) => {
    return await v2.uploader.destroy(public_id);
}

module.exports = {
    uploadImage, 
    deleteImage
}