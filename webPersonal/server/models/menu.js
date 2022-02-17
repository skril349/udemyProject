const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = Schema({
  title: String,
  url: String,
  active: Boolean,
  order: Number,
});

module.exports = mongoose.model("Menu", MenuSchema);
