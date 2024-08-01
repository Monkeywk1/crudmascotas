const express = require('express')
const app = express()
const port = 3000

/*conexion a la base de datos mongodb cloud */
const mongoose = require('mongoose');
const usuario = 'full_stack';
const password = 'lLyyClLtX2lJ695S';
const dbName = 'veterinaria';

const uri = `mongodb+srv://${usuario}:${password}@cluster0.rldoi7c.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(e=> console.log('error de conexion a MongoDB', e))

/*establecer el motor de plantillas */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/*middleware para contenido estatico */
app.use(express.static(__dirname + '/public'));

/*enrutamiento del proyecto */
app.use('/', require('./router/rutasweb'));
app.use('/mascotas', require('./router/mascotas'));


/*direccionar a vista 404 cuando se presente el error404 */
app.use((req, res, next) => {
  res.status(404).render('404', {
    titulo: "Error 404",
    descripcion: "Página No Encontrada"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})