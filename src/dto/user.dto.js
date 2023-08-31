
const userDTO = (user) => {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    address: user.address,
    phone: user.phone,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
