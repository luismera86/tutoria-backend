import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import { mongoDBConnection } from "./config/mongoDB.config.js";
import { routerCarts } from "./routes/carts.routes.js";
import { routerProducts } from "./routes/products.routes.js";
import { routerViews } from "./routes/views.router.js";
import { routerSessions } from "./routes/sessions.routes.js";
import * as messageServices from "./services/message.services.js";
import * as productServices from "./services/product.services.js";
import { initializePassport } from "./config/passport.config.js";
import config from "./config/config.js";

// Datos de configuración del servidor
const { PORT, COOKIE_SECRET } = config;

// Almacenamos express ejecutado en la constante app
const app = express();

// Implementamos handlebars
app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("views", "views");
app.set("view engine", "handlebars");

// conectamos mongoose con la base de datos local
mongoDBConnection();

app.use(express.static("public"));

app.use(express.json());

app.use(cookieParser(COOKIE_SECRET));

app.use(session({ secret: COOKIE_SECRET, resave: true, saveUninitialized: true }));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

// Iniciamos las rutas importadas, las de products y carts para poder utilizar los endpoints
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("/api/sessions", routerSessions);
app.use("/", routerViews);
app.get("*", (req, res) => {
  res.status(404).send({ error: "Página no encontrada" });
});

// Iniciamos el servidor en el puerto asignado en la constante PORT

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor conectado en el puerto ${PORT}`);
});

// Configuramos el servidor de socket io
const socketServer = new Server(httpServer);

// Configuramos los eventos de conexión y desconexión de los clientes
socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado");
  const products = await productServices.getAllProducts();

  socket.emit("products", products.docs);

  const messages = await messageServices.getMessages();
  socket.emit("messages", messages);

  socket.on("new-product", async (data) => {
    await productServices.addProduct(data);
    const products = await productServices.getAllProducts();
    socket.emit("products", products.docs);
  });

  socket.on("delete", async (id) => {
    await productServices.deleteProduct(id);
    const products = await productServices.getAllProducts();
    socket.emit("products", products.docs);
  });

  socket.on("chatMessage", async (data) => {
    await messageServices.saveMessage(data);
    const messages = await messageServices.getMessages();
    socketServer.emit("messages", messages);
  });
});
