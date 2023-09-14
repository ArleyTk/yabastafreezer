const {response} = require('express')

//Importación de los modelos
const Permiso = require('../models/usuario')

//Método GET de la API
const permisoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los permisos
    const permisos = await Permiso.find()

    res.json({  //Respuesta en JSON
        permisos
    })   
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

    const {nombre, password, rol, estado} = req.body
    let mensaje = 'Modificación exitosa'
    try{
         await Permiso.findOneAndUpdate({nombre: nombre}, 
            {password: password, rol:rol, estado:estado})
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