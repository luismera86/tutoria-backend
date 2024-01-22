import { Router } from "express";
import { addFiles, changeRole, deleteUser, getAllUsers, getUserByEmail, getUserById } from "../controllers/user.controllers.js";
import { uploaderFiles } from "../utils/uploadFiles.js";
import { checkUserDocuments } from "../middlewares/checkUserDocuments.js";

const routerUsers = Router();

routerUsers.get("/", getAllUsers);
routerUsers.get("/email/:email", getUserByEmail);
routerUsers.get("/:uid", getUserById);
routerUsers.get("/premium/:uid", checkUserDocuments, changeRole);
routerUsers.delete("/:uid", deleteUser);
routerUsers.post("/:uid/documents", uploaderFiles, addFiles);

export { routerUsers };

