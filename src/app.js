// Importamos express
import express from 'express';

// Importamos sockets io
import { Server } from 'socket.io';

// Importamos handlebars
import handlebars from 'express-handlebars';

// Importamos mongoose
import mongoose from 'mongoose';

// Importamos las rutas que vamos a inicializar
import { MessageManager } from './dao/managers/DB/MessageManager.db.js';
import cartsRouter from './routes/carts.routes.js';
import productRouter from './routes/products.routes.js';
import viewsRouters from "./routes/views.routes.js";
import { __dirname } from './utils.js';

// Almacenamos el puerto en una constante
const PORT = 8080;

// Almacenamos express ejecutado en la constante app
const app = express();

// conectamos mongoose con la base de datos local
mongoose.connect('mongodb://127.0.0.1:27017/tutoria')

// Implementamos handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Asignamos la carpeta donde van a estar los contenidos públicos
app.use(express.static(__dirname + '/public'));

// Usamos express.json() para que express pueda interpretar los archivos json y recibidos en el body y los parsea para poder trabajarlos con javascript
app.use(express.json());

// express.urlencoded es una función proporcionada por Express. Esta función se utiliza para analizar los datos que se envían desde un formulario HTML que se envía mediante el método HTTP POST.
app.use(express.urlencoded({ extended: true }));

// Iniciamos las rutas importadas, las de products y carts para poder utilizar los endpoints
app.use('/api', productRouter);
app.use('/api', cartsRouter);
app.use("/", viewsRouters)

// Iniciamos el servidor en el puerto asignado en la constante PORT

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});

// Configuramos el servidor de socket io
const socketServer = new Server(httpServer);

// Incorporamos el MessageManager
const message = new MessageManager();

// Inicializamos el servidor para que nos muestre un mensaje cuando se conecte un nuevo usuario al conectarse al servidor. 
socketServer.on("connection", async (socket) => { 
  console.log("Nuevo cliente conectado")

  // Recibimos el message del cliente y lo almacenamos en la DB
  socket.on("message", async data => {
    await message.saveMessage(data);
    // Recuperamos los mensajes de la DB y se los enSviamos al cliente
    const messages = await message.getMessages();
    
    socket.emit("messageLog", messages)
  })

 })
