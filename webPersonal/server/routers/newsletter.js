const express = require("express");
const NewsLetterController = require("../controllers/newsletter");
const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/subscribe-newsletter/:email", NewsLetterController.subscribeEmail);

module.exports = api;
