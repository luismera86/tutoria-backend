const userDTO = (user) => {
  const { first_name, last_name, email, role, age, _id, cart, last_connection } = user;
  return {
    _id,
    first_name,
    last_name,
    email,
    role,
    age,
    cart,
    last_connection,
  };
};

export { userDTO };
