import { userModel } from "../models/user.model.js";

const getAllUsers = async () => {
  const users = await userModel.find({});
  return users;
};

const createUser = async (user) => {
  const newUser = await userModel.create(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email: email });
  return user;
};

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

const changePassword = async (email, newPassword) => {
  await userModel.findOneAndUpdate({ email: email }, { password: newPassword });
};

const changeRole = async (email) => {
  const user = await userModel.findOne({ email: email });
  if (user.role === "user") {
    const resp = await userModel.findOneAndUpdate({ email: email }, { role: "premium" });

    return resp;
  }
  if (user.role === "premium") {
    const resp = await userModel.findOneAndUpdate({ email: email }, { role: "user" });
    return resp;
  }
};

const deleteUser = async (id) => {
  await userModel.findByIdAndDelete(id);
};

const addLastConnection = async (uid, date) => {
  const user = await userModel.findById(uid);
  user.last_connection = date;
  await user.save();

  return user;
};

const addFiles = async (uid, files) => {
  const user = await userModel.findById(uid);
  user.documents = files;
  await user.save();

  return user;
 };

export { createUser, getUserByEmail, getUserById, changePassword, changeRole, getAllUsers, deleteUser, addLastConnection, addFiles };
