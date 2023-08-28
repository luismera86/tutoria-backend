import { userModel } from "../../models/user.model.js";

class UserManager {
  async createUser(user) {
    const newUser = await userModel.create(user);
    return newUser;
  }

  async getUserByEmail(email) {
    const user = await userModel.findOne({ email: email });
    return user;
  }

  async getUserById(id) {
    const user = await userModel.findById(id);
    return user;
  }

  async changePassword(email, newPassword) {
    await userModel.findOneAndUpdate({ email: email }, { password: newPassword });
  }
}

export const userManager = new UserManager();