const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middleware/authenticated");
const multipart = require("connect-multiparty");
const { ensureIndexes } = require("../models/user");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });

const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);
api.put(
  "/upload-avatar/:id",
  [md_auth.ensureAuth, md_upload_avatar],
  UserController.uploadAvatar
);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.get("/get-avatar/:avatarName", UserController.getAvatar);
api.put(
  "/activate-user/:id",
  [md_auth.ensureAuth],
  UserController.activateUser
);
module.exports = api;
