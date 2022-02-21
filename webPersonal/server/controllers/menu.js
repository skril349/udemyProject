const Menu = require("../models/menu");

function addMenu(req, res) {
  const { title, url, order, active } = req.body;
  const menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;
  menu.save((err, createdMenu) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!createdMenu) {
        res.status(404).send({ message: "error al crear el menu" });
      } else {
        res.status(200).send({ message: "menu creado correctamente" });
      }
    }
  });
}

function getMenu(req, res) {
  console.log("get Menu");
  Menu.find()
    .sort({ order: "asc" })
    .exec((err, menus) => {
      if (err) {
        res.status(500).send({ message: "error del servidor" });
      } else {
        if (!menus) {
          res.status(404).send({ message: "no se han encontrado menus" });
        } else {
          res.status(200).send({ message: "menus encontrados", menu: menus });
        }
      }
    });
}

function updateMenu(req, res) {
  let menuData = req.body;
  const params = req.params;
  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!menuUpdate) {
        res.status(404).send({ message: "no se ha encontrado ningun menu" });
      } else {
        res.status(200).send({ message: "menu actualizado correctamente" });
      }
    }
  });
}

function activateMenu(req, res) {
  let { active } = req.body;
  const params = req.params;
  Menu.findByIdAndUpdate(params.id, { active }, (err, menuActivated) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!menuActivated) {
        res.status(404).send({ message: "no se ha encontrado ningun menu" });
      } else {
        if (active === true) {
          res.status(200).send({ message: "menu activado correctamente" });
        } else {
          res.status(200).send({ message: "menu desactivado correctamente" });
        }
      }
    }
  });
}

function deleteMenu(req, res) {
  const { id } = req.params;
  console.log(req.params);
  Menu.findByIdAndRemove({ _id: id }, (err, menuDeleted) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor" });
    } else {
      if (!menuDeleted) {
        res.status(404).send({ message: "no se ha encontrado el menu" });
      } else {
        res.status(200).send({ message: "menu eliminado correctamente" });
      }
    }
  });
}

module.exports = {
  addMenu,
  getMenu,
  updateMenu,
  activateMenu,
  deleteMenu,
};
