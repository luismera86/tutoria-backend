import mongoose from "mongoose";

const checkMongoId = (req, res, next) => {
  const id = req.params.cid || req.params.pid || req.params.uid || req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    next();
  } else {
    res.status(400).json({ error: "Invalid mongo id" });
  }
};

export { checkMongoId };
