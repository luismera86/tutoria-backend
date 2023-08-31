const userDTO = (user) => {
  const { first_name, last_name, email, role, age, _id } = user;
  return {
    first_name,
    last_name,
    email,
    role,
    age,
    _id,
  };
};

export { userDTO };
