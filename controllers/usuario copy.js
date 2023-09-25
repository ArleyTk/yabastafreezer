const {response} = require('express')

//Importación de los modelos
const Usuario = require('../models/usuario')

//Método GET de la API
const usuarioGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const usuarios = await Usuario.find()

    res.json({  //Respuesta en JSON
        usuarios
    })   
}

//Método POST de la api
const usuarioPost = async(req, res) => {
    let mensaje = 'Inserción Exitosa'
    const body = req.query //Captura de atributos
    try {
        const usuario = new Usuario(body) //Instanciando el objeto
        await usuario.save() //Inserta en la colección
    } catch (error) {
        mensaje = error
        console.log(error)
    }
        res.json({
        msg: mensaje
    })
}

//Modifcación
const usuarioPut = async(req, res = response) => {

    const {nombre, password, rol, estado} = req.query
    let mensaje = 'Modificación exitosa'
    try{
         await Usuario.findOneAndUpdate({nombre: nombre}, 
            {password: password, rol:rol, estado:estado})
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}





module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut
}