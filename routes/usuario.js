const {Router} = require('express')
//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {permisoGet, permisoPost, permisoPut, permisoDelete} = require('../controllers/usuario')

route.get('/', permisoGet) //Listar Datos

route.post('/', permisoPost) //Insertar Datos

route.put('/', permisoPut) //Modificar Datos

route.delete('/', permisoDelete) //Eliminar Datos

module.exports = route