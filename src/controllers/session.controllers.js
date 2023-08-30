const login = async (req, res) => {
  try {
    if (!req.user) return res.status(400).send({ status: "error", message: "Error credenciales inválidas" });
    const { first_name, last_name, age, email, role } = req.user;

    req.session.user = {
      first_name,
      last_name,
      age,
      email,
      role,
    };

    res.send({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    // Destruimos la sesión
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      // Devolvemos el mensaje de sesión cerrada
      res.json({ message: "Sesión cerrada" });
    });
  } catch (error) {
    console.log(error);
  }
};

const current = async (req, res) => {
  try {
    if (req.session.user) {
      res.send({ status: "success", payload: req.session.user });
    } else {
      res.send({ status: "success", payload: null });
    }
  } catch (error) {
    console.log(error);
  }
};

const github = async (req, res) => {
  try {
    req.session.user = req.user;
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

export { login, logout, current, github };
