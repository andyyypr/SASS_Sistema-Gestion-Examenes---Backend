const db = require("../config/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return reject(err);
        }

        if (results.length === 0) {
          return reject(new Error("Invalid credentials"));
        }

        const user = results[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return reject(new Error("Invalid credentials"));
        }

        resolve(user);
      },
    );
  });
};

const registerUser = async (name, email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // verificar email existente
      db.query(
        "SELECT id FROM users WHERE email = ?",
        [email],
        async (err, results) => {
          if (err) {
            return reject(err);
          }

          if (results.length > 0) {
            return reject(new Error("Email already exists"));
          }

          // hashear password
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = {
            id: uuidv4(),
            name,
            email,
            password: hashedPassword,
          };

          db.query(
            `
            INSERT INTO users
            (id, name, email, password)
            VALUES (?, ?, ?, ?)
            `,
            [newUser.id, newUser.name, newUser.email, newUser.password],
            (err) => {
              if (err) {
                return reject(err);
              }

              resolve(newUser);
            },
          );
        },
      );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  loginUser,
  registerUser,
};
