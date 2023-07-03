import userModel from "../../models/user.model";

class UserManager {
  async getAllUsers() {
    const users = await userModel.find();

    return users;
  }

  async getUserById(id) {
    const user = await userModel.findById(id);

    return user;
  }

  async registerUser(data) {
    const { first_name, last_name, email, age, password } = data;
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password,
    };
    const user = await userModel.create(newUser);

    return user;
  }
}

export const userManager = new UserManager();