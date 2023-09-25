const {Schema, model} = require('mongoose')

const PermisoSchema = Schema({
    idrol: {
        type: Number,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },

    nombrerol: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

    descrol: {
        type: String,
        required: true,
    },

    permisosrol: {
        type: String,
        required: [true, 'el nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres']
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

    estado_rol: {
        type: Boolean,
        required: false
        
        //maxlength:  [7, 'Debe tener máximo 3 caracteres']
    }
})

//Exportar la función PermisoSchema
module.exports = model('Permiso',PermisoSchema)

