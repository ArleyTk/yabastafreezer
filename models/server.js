const express = require('express')// Framework de node
const cookieParser = require('cookie-parser');//Para variables en el navegador
const cors  = require('cors');//Implementar seguridad
const bodyParser = require('body-parser')//Recibir datos de formularios html
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT //Capturando variable puerto
        this.usuarioPath = '/api/usuario' //Ruta pública
        this.authPath = '/api/auth'
        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }

    middlewares(){
        this.app.use(cookieParser()); 
        this.app.use(express.static(__dirname + "/public"));
        this.app.use( cors() );
        this.app.use(bodyParser.json()) // for parsing application/json
    }

    routes(){
        this.app.use(this.usuarioPath, require('../routes/usuario'))
        this.app.use(this.authPath, require('../routes/auth'))
    }
    

    async conectarDB(){
        await dbConnection() //Esperar la respuesta del servidor        
    }
}

module.exports =  Server