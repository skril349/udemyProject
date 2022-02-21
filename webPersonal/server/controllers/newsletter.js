const NewsLetter = require("../models/newsletter");
const fs = require("fs");
const path = require("path");

function subscribeEmail(req, res) {
  console.log(req.params);
  const { email } = req.params;
  const newsletter = new NewsLetter();
  if (!email) {
    res.status(500).send({ message: "falta añadir el email" });
  } else {
    newsletter.email = email.toLowerCase();

    newsletter.save((err, NewsletterStored) => {
      if (err) {
        res.status(500).send({ message: "error del servidor", status: 500 });
      } else {
        if (!NewsletterStored) {
          res
            .status(404)
            .send({ message: "error al crear al usuario", status: 404 });
        } else {
          res.status(200).send({
            message: "usuario registrado en newsletter correctamente",
            status: 200,
          });
        }
      }
    });
  }
}

module.exports = {
  subscribeEmail,
};
