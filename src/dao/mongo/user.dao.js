import { userModel } from "../models/user.model.js";



const createUser = async (user) => {
  const newUser = await userModel.create(user);
  return newUser;
}

const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email: email });
  return user;
}

const getUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
}

const changePassword = async (email, newPassword) => {
  await userModel.findOneAndUpdate({ email: email }, { password: newPassword });
}

export { createUser, getUserByEmail, getUserById, changePassword}