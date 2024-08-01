const express = require('express')
const router = express.Router();

const Mascota = require('../models/mascota');

router.get('/', async (req, res)=>{
try {
    const arrayMascotas = await Mascota.find();
//    console.log(arrayMascotas)
    res.render("mascotas",{arrayMascotas})
} catch (error) {
    console.log(error)
}

//    res.render('mascotas', {arrayMascotas: [
//        {id: 'mas001', nombre: 'Coco', descripcion: 'Perro French Poodle'},
//        {id: 'mas001', nombre: 'Endy', descripcion: 'Gato Persa'},
//        {id: 'mas001', nombre: 'Duna', descripcion: 'Perro Labrador'},
//        {id: 'mas001', nombre: 'Grays', descripcion: 'Gato Angora'},
//    ]});
});

module.exports = router;