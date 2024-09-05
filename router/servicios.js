const express = require('express');
const router = express.Router();

const servicio = require('../models/servicio');

router.get('/', async (req, res) => {
    try {
        const arrayServicios = await servicio.find();
        //console.log(arrayServicios)
        res.render("servicios", {arrayServicios})
    } catch (error) {
        console.log(error)
    }
})

router.get('/crearserv', (req, res) => {
    res.render('crearserv');
})

router.post('/', async (req, res) => {
    const body = req.body;
    try{
        await servicio.create(body)
        res.redirect('/servicios')
    }catch(error){
        console.log("error", error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const servicioDB = await servicio.findOne({_id: id})
        //console.log(servicioDB)
        res.render('detalleserv',{
            servicio: servicioDB,
            error: false
        })
    }catch(error){
        console.log("error", error)
        res.render('detalle',{
            error: true,
            mensaje: 'no se encontró ningún registro que conincida con el id'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const servicioDB = await servicio.findByIdAndDelete({_id: id})
        if (!servicioDB) {
            res.json({
                estado: false,
                mensaje: "No fue posible elimiar el registro"
            })
        } else {
            res.json({
                estado: true,
                mensaje: "Registro eliminado"
                })
        }
    }catch(error){
        console.log("error", error)   
    }
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const servicioDB = await servicio.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        res.json({
            estado: true,
            mensaje: 'Servicio editado'
        })
    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'Edicion fallida'
        })
    }
});

module.exports = router;