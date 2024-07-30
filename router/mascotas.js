const express = require('express')
const router = express.Router();

router.get('/',(req, res)=>{
    res.render('mascotas', {arrayMascotas: [
        {id: 'mas001', nombre: 'Coco', descripcion: 'Perro French Poodle'},
        {id: 'mas001', nombre: 'Endy', descripcion: 'Gato Persa'},
        {id: 'mas001', nombre: 'Duna', descripcion: 'Perro Labrador'},
        {id: 'mas001', nombre: 'Grays', descripcion: 'Gato Angora'},
    ]});
});

module.exports = router;