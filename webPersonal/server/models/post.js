const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: String,
  url: {
    type: String,
    unique: true,
  },
  description: String,
  date: Date,
});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", postSchema);
