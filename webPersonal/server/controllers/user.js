const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
//const { use } = require("../routers/user");
const user = require("../models/user");
const { exists } = require("../models/user");

function signUp(req, res) {
  const user = new User();

  console.log(req.body);
  const { name, lastname, email, password, repeatPassword } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
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

function signIn(req, res) {
  //console.log("login Correct");
  const params = req.body;
  console.log(params);
  const email = params.email.toLowerCase();
  const password = params.password;

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "el usuario no existe" });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "error del servidor" });
          } else if (!check) {
            res.status(404).send({ message: "la contraseña no es correcta" });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no esta activo" });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  User.find().then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario" });
    } else {
      res.status(200).send({
        users,
      });
    }
  });
}

function getUsersActive(req, res) {
  const query = req.query;
  User.find({ active: query.active }).then((users) => {
    if (!users) {
      res.status(404).send({ message: "No se ha encontrado ningun usuario" });
    } else {
      res.status(200).send({
        users,
      });
    }
  });
}

function uploadAvatar(req, res) {
  const params = req.params;

  User.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!userData) {
        res.status(404).send({ message: "No se ha encontrado ningun usuario" });
      } else {
        let user = userData;
        if (req.files) {
          let filePath = req.files.avatar.path;
          console.log(filePath);
          let fileSplit = filePath.split("\\");
          console.log(fileSplit);
          let fileName = fileSplit[2];
          let extensionSplit = fileName.split(".");
          console.log(extensionSplit);
          let fileExtension = extensionSplit[1];

          if (
            fileExtension !== "png" &&
            fileExtension !== "jpg" &&
            fileExtension !== "jpeg"
          ) {
            res.status(400).send({
              message:
                "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg",
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor" });
                } else {
                  if (!userResult) {
                    res.status(404).send({ message: "No existe el usuario" });
                  } else {
                    res.status(200).send({ message: userResult });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res) {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;
  fs.access(filePath, (error) => {
    if (error) {
      res.status(404).send({ message: "El avatar que buscas no existe" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
}

async function updateUser(req, res) {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({ message: "error al encriptar la contraseña" });
      } else {
        userData.password = hash;
      }
    });
  }
  User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!userUpdate) {
        res.status(404).send({ message: "no se ha encontrado ningun usuario" });
      } else {
        res.status(200).send({ message: "usuario actualizado correctamente." });
      }
    }
  });
}
module.exports = {
  signUp,
  signIn,
  getUsers,
  getUsersActive,
  uploadAvatar,
  getAvatar,
  updateUser,
};
