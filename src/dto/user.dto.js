const userDTO = (user) => {
  const { first_name, last_name, email, role, age, _id, cart } = user;
  return {
    first_name,
    last_name,
    email,
    role,
    age,
    cart,
    _id,
  };
};

export { userDTO };
