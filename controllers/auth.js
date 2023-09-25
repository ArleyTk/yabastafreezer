const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt') //Encriptar
const { generarJWT } = require('../helpers/generar_jwt')
const jwt = require('jsonwebtoken');

async function comparePassword(passwordForm, passworsBD) {
    const result = await bcrypt.compare(passwordForm, passworsBD);
    return result;
}

const login = async(req, res) => {

    const { nombre, password } = req.body
    
    //Verificar si el nombre existe
    const usuarios = await Usuario.findOne({nombre})
    try {
        if(!usuarios){//Si no encontró el nombre
            return res.status(400).json({
                msg: 'Usuario no existe'
            })
        }
        if(usuarios.estado == false){
            return res.status(400).json({
                msg: 'Usuario está inactivo'
            })
        }

        resultado = await comparePassword(password, usuarios.password)

        if(resultado == true){
            const token = await generarJWT(usuarios)
            res.cookie('token',token);//creando la cookie

            return res.status(200).json({
                //msg: 'Bienvenido'
                token
            })
        }
        else{
            return res.status(400).json({
                msg: 'Usuario y/o password incorrecto'
            })
        }

    } catch (error) {
        return res.status(400).json({
            msg: 'Apreciado usuario contacte al administrador.'
        })
    }
}

const isAuthenticated = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        console.log('token:'+token)
        if(!token){
            return next('Por favor logueese.');
        }
        const verify = jwt.verify(token,process.env.SECRETKEY);
        console.log('verify:'+verify)
        
        req.user = await Usuario.findById(verify.id);
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = {
    login,
    isAuthenticated
}

//Alexandra Gamboa
//Carlos Muñoz
//Yhosman Sánchez
//Santiago Zapata

