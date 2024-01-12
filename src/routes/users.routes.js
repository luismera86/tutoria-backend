import { Router } from "express";
import { changeRole, deleteUser, getAllUsers, getUserByEmail, getUserById } from "../controllers/user.controllers.js";

const routerUsers = Router();

routerUsers.get("/", getAllUsers);
routerUsers.get("/email/:email", getUserByEmail);
routerUsers.get("/:uid", getUserById);
routerUsers.get("/premium/:uid", changeRole);
routerUsers.delete("/:uid", deleteUser);

export { routerUsers };
