import * as userDao from "../dao/mongo/user.dao.js";

const getAllUsers = async () => { 
  const users = await userDao.getAllUsers();
  return users;
}

const createUser = async (user) => {
  const newUser = await userDao.createUser(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await userDao.getUserByEmail(email);
  return user;
};

const getUserById = async (id) => {
  const user = await userDao.getUserById(id);
  return user;
};

const changePassword = async (email, newPassword) => {
  await userDao.changePassword(email, newPassword);
};

const changeRole = async (email) => {
  const user = await userDao.changeRole(email);
  return user;
};

const deleteUser = async (id) => {
  await userDao.deleteUser(id);

};

export { createUser, getUserByEmail, getUserById, changePassword, changeRole, getAllUsers, deleteUser };
