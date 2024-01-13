import { Router } from "express";
import { changeRole, deleteUser, getAllUsers, getUserByEmail, getUserById } from "../controllers/user.controllers.js";
import { uploaderFiles } from "../utils/uploadFiles.js";

const routerUsers = Router();

routerUsers.get("/", getAllUsers);
routerUsers.get("/email/:email", getUserByEmail);
routerUsers.get("/:uid", getUserById);
routerUsers.get("/premium/:uid", changeRole);
routerUsers.delete("/:uid", deleteUser);
// routerUsers.post(
//   "/:uid/documents",
//   uploader.fields([
//     { name: "profile", maxCount: 1 },
//     { name: "documents", maxCount: 1 },
//     { name: "imgProducts", maxCount: 1 },
//   ])
// );
routerUsers.post("/test/documents", uploaderFiles, (req, res) => {
  const array = Object.values(req.files).flat();
  console.log(array);
  res.send("ok");
});

export { routerUsers };

