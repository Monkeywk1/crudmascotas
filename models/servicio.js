const mongoose = require('mongoose');
const schema = mongoose.Schema;

const servicioSchema = new schema({
    servicio: String,
    descripcion: String
})

/*creacion del modelo */
const Servicio = mongoose.model('servicio', servicioSchema);
module.exports = Servicio;