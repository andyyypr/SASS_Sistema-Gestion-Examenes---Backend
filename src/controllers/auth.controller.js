const { loginUser, registerUser } = require("../services/auth.services");
const { generateToken } = require("../utils/jwt");

//Iniciar sesion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validaciones básicas
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await loginUser(email, password);

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

//Registrar nuevo usuario
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // password mínima
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const user = await registerUser(name, email, password);

    const token = generateToken(user);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
