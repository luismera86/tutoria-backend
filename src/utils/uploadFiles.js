import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profile") {
      cb(null, "./public/uploads/profile");
    } else if (file.fieldname === "documents") {
      cb(null, "./public/uploads/documents");
    } else if (file.fieldname === "imgProducts") {
      cb(null, "./public/uploads/products");
    } else {
      cb(null, "./public/uploads");
    }
  },
  filename: function (req, file, cb) {
    const userId = req.user.id; 
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension);
    cb(null, `${basename}-${userId}${extension}`);
  },
});

export const uploaderFiles = multer({ storage: storage }).fields([
  { name: "profile", maxCount: 1 },
  { name: "documents", maxCount: 8 },
  { name: "imgProducts", maxCount: 3 },
]);
export const uploaderFile = multer({ storage: storage }).single("document");