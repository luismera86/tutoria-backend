// Importamos express 
const express = require('express');

// Importamos las rutas que vamos a inicializar
const productRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');

// Almacenamos el puerto en una constante
const PORT = 8080;

// Almacenamos express ejecutado en la constante app 
const app = express();

// Usamos express.json() para que express pueda interpretar los archivos json y recibidos en el body y los parsea para poder trabajarlos con javascript
app.use(express.json());

// express.urlencoded es una función proporcionada por Express. Esta función se utiliza para analizar los datos que se envían desde un formulario HTML que se envía mediante el método HTTP POST.
app.use(express.urlencoded({ extended: true }));

// Iniciamos las rutas importadas, las de products y carts para poder utilizar los endpoints
app.use('/api', productRouter);
app.use('/api', cartsRouter);

// Iniciamos el servidor en el puerto asignado en la constante PORT
app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});
