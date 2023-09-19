const {response} = require('express')

//Importación de los modelos
const Permiso = require('../models/usuario')

//Método GET de la API
const permisoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {_id} = req.query;
    //Consultar todos los usuarios
    try {
        let permisos;

        if (_id) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            permisos = await Permiso.find({ _id: _id });
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            permisos = await Permiso.find();
        }

        res.json({ permisos });
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    } 
}

//Método POST de la api
const permisoPost = async(req, res) => {
    let mensaje = 'Inserción Exitosa'
    const body = req.body //Captura de atributos
    try {
        const permiso = new Permiso(body) //Instanciando el objeto
        await permiso.save() //Inserta en la colección
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

//Juan Sebastián Granada

//Modifcación
const permisoPut = async(req, res = response) => {

    const {_id, idrol, nombrerol, descrol, permisosrol} = req.body
    let mensaje = 'Modificación exitosa'
    try{
         await Permiso.updateMany({_id: _id}, {$set: {
            idrol: idrol, nombrerol:nombrerol, descrol:descrol, permisosrol:permisosrol
         }})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}

//Eliminación
const permisoDelete = async(req, res) => {

    const {_id} = req.query
    let mensaje = 'La eliminiación se efectuó exitosamente.'

    try{
        const permiso = await Permiso.deleteOne({_id: _id})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    permisoGet,
    permisoPost,
    permisoPut,
    permisoDelete
}