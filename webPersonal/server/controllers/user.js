const bcrypt = require("bcrypt-nodejs");
const { Model } = require("mongoose");

const User = require("../models/user");
const { use } = require("../routers/user");

function signUp(req, res) {
  console.log("EndPoint de Sign Up");

  const user = new User();

  console.log(req.body);
  const { email, password, repeatPassword } = req.body;
  user.email = email;
  user.role = "admin";
  user.active = false;
  if (!password || !repeatPassword) {
    res.status(404).send({ message: "las contraseñas son obligatorias..." });
  } else {
    console.log("Continuar...");
    if (password !== repeatPassword) {
      res.status(404).send({ message: "las contraseñas no coinciden..." });
    } else {
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res.status(500).send({ message: "Error al encriptar la contraseña" });
        } else {
          res.status(200).send({ message: hash });
          user.password = hash;

          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "error del servidor" });
            } else {
              if (!userStored) {
                res.status(404).send({ message: "error al crear al usuario" });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}
module.exports = {
  signUp,
};
