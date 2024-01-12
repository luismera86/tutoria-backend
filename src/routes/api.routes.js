import { Router } from "express";
import { routerProducts } from "./products.routes.js";
import { routerCarts } from "./carts.routes.js";
import { routerSessions } from "./sessions.routes.js";
import { routerTest } from "./test.routes.js";
import { routerUsers } from "./users.routes.js";


const apiRoutes = Router();
apiRoutes.use("/products", routerProducts);
apiRoutes.use("/carts", routerCarts);
apiRoutes.use("/sessions", routerSessions);
apiRoutes.use("/users", routerUsers);
apiRoutes.use("/test", routerTest);

export { apiRoutes };