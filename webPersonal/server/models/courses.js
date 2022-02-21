const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursesSchema = Schema({
  idCourse: {
    type: Number,
    unique: true,
    required: true,
  },
  link: String,
  coupon: String,
  price: Number,
  order: Number,
});

module.exports = mongoose.model("Courses", CoursesSchema);
