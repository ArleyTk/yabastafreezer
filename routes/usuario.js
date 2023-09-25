const {Router} = require('express')
//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {usuarioGet, usuarioPost, usuarioPut, usuarioDelete} = require('../controllers/usuario')
const  {isAuthenticated}  = require('../controllers/auth')

route.get('/', isAuthenticated, usuarioGet) //Listar Datos

route.post('/', usuarioPost) //Insertar Datos

route.put('/', usuarioPut) //Modificar Datos

route.delete('/', usuarioDelete) //Eliminar Datos

module.exports = route