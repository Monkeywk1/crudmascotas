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

});

router.get('/crear', (req, res)=>{
        res.render('crear');
});

/*router para recibir datos del formulario crear */
router.post('/', async (req, res)=>{
    const body = req.body;
//    console.log(body);
    try {
        await Mascota.create(body)
        res.redirect('/mascotas')
    } catch (error){
        console.log('error:', error)
    }
});
/*router para editar un documento */
router.get("/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const mascotaBD = await Mascota.findOne({_id: id})
        //console.log(mascotaDB)
        res.render('detalle',{
            mascota: mascotaBD,
            error: false
        })
    } catch (error){
        console.log('error:', error)
        res.render('detalle',{
            error: true,
            mensaje: "No se encontro ningún registro qué conincida con el id"
        })
    }
});
/*router para borrar un documento */
router.delete("/:id", async (req, res)=>{
    const id = req.params.id;
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})
        if (!mascotaDB) {
            res.json({
                estado: false,
                mensaje: "No fue posible eliminar el registro"
            })
        } else {
            res.json({
                estado: true,
                mensaje: "Registro Eliminado!!!"
        })
        }
        
    } catch (error){
        console.log('error:', error)
        
    }
});

/*router para la acutalizacion */
router.put('/:id', async(req, res) => {
   const id = req.params.id;
   const body = req.body;
   //console.log(body);
   try {
    const mascotaDB = await Mascota.findByIdAndUpdate(
        id, body, {useFindAndModify: false}
    )
    res.json({
        estado: true,
        mensaje: 'Mascota Editada'
    })
   } catch (error) {
    console.log(error);
    res.json({
        estado: false,
        mensaje: 'Edicion Fallida'
    })
   } 
});
module.exports = router;