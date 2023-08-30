import * as userServices from "../services/user.services.js";

const createUser = async (user) => {
  try {
    const newUser = await userServices.createUser(user);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await userServices.getUserByEmail(email);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await userServices.getUserById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (email, newPassword) => {
  try {
    await userServices.changePassword(email, newPassword);
    return "Contraseña cambiada con éxito";
  } catch (error) {
    console.log(error);
  }
};

export { createUser, getUserByEmail, getUserById, changePassword };
