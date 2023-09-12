import { Router } from "express";
import { changeRole } from "../controllers/user.controllers.js";

const routerUsers = Router();

routerUsers.get("/premium/:uid", changeRole);

export { routerUsers };