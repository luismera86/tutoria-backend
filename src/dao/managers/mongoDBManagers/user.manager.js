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
}

export const userManager = new UserManager();