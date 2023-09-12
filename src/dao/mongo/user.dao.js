import { userModel } from "../models/user.model.js";

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

export { createUser, getUserByEmail, getUserById, changePassword, changeRole };
