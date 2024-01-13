import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profile") cb(null, "./public/uploads/profile");
    if (file.fieldname === "documents") cb(null, "./public/uploads/documents");
    if (file.fieldname === "imgProducts") cb(null, "./public/uploads/products");
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage: storage });