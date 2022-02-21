const Post = require("../models/post");

function addPost(req, res) {
  console.log("add Post");
  const body = req.body;
  const post = new Post(body);
  post.save((err, postStored) => {
    if (err) {
      res.status(500).send({
        message: "Error del servidor",
        status: 500,
      });
    } else {
      if (!postStored) {
        res.status(400).send({
          message: "No se ha podido crear el post",
          status: 400,
        });
      } else {
        res.status(200).send({
          message: "post creado correctamente",
          status: 200,
        });
      }
    }
  });
}

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Post.paginate({}, options, (err, postStored) => {
    if (err) {
      res.status(500).send({
        message: "error del servidor",
        status: 500,
      });
    } else {
      if (!postStored) {
        res.status(404).send({
          message: "no se ha encontrado ningun post",
          status: 404,
        });
      } else {
        res.status(200).send({
          posts: postStored,
          status: 200,
        });
      }
    }
  });
}

function updatePost(req, res) {
  const postData = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
    if (err) {
      res.status(500).send({
        message: "Error del servidor",
        status: 500,
      });
    } else {
      if (!postUpdate) {
        res.status(404).send({
          message: "No se ha encontrado el post",
          status: 404,
        });
      } else {
        res.status(200).send({
          message: "se ha actualizado correctamente el post",
          status: 200,
        });
      }
    }
  });
}

function deletePost(req, res) {
  const { id } = req.params;
  Post.findByIdAndRemove({ _id: id }, (err, postDeleted) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor", status: 500 });
    } else {
      if (!postDeleted) {
        res
          .status(404)
          .send({ message: "no se ha encontrado el post", status: 404 });
      } else {
        res
          .status(200)
          .send({ message: "post eliminado correctamente", status: 200 });
      }
    }
  });
}

function getPost(req, res) {
  const { url } = req.params;
  Post.findOne({ url }, (err, postStored) => {
    if (err) {
      res.status(500).send({
        message: "error del servidor",
        status: 500,
      });
    } else {
      if (!postStored) {
        res.status(404).send({
          message: "no se ha encontrado ningun post",
          status: 404,
        });
      } else {
        res.status(200).send({
          post: postStored,
          status: 200,
        });
      }
    }
  });
}

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
};
