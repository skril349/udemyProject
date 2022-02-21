const Course = require("../models/courses");
const fs = require("fs");
const path = require("path");

function addCourse(req, res) {
  const body = req.body;
  const course = new Course(body);
  course.order = 1000;
  console.log(course);
  if (!body) {
    res.status(400).send({ message: "error del servidor", status: 400 });
  } else {
    course.save((err, courseStored) => {
      if (err) {
        res.status(400).send({ message: "el curso ya existe", status: 400 });
      } else {
        if (!courseStored) {
          res
            .status(400)
            .send({ message: "no se ha podido crear el curso", status: 400 });
        } else {
          res
            .status(200)
            .send({ message: "curso creado correctamente", status: 200 });
        }
      }
    });
  }
}

function getCourses(req, res) {
  console.log("get courses");
  Course.find()
    .sort({ order: "asc" })
    .exec((err, courses) => {
      if (err) {
        res.status(500).send({ message: "error del servidor", status: 500 });
      } else {
        if (!courses) {
          res
            .status(404)
            .send({ message: "no se han encontrado courses", status: 404 });
        } else {
          res
            .status(200)
            .send({
              message: "courses encontrados",
              courses: courses,
              status: 200,
            });
        }
      }
    });
}

function updateCourses(req, res) {
  let courseData = req.body;
  const params = req.params;
  Course.findByIdAndUpdate(params.id, courseData, (err, courseUpdate) => {
    if (err) {
      res.status(500).send({ message: "error del servidor", status: 500 });
    } else {
      if (!courseUpdate) {
        res
          .status(404)
          .send({ message: "no se ha encontrado ningun curso", status: 404 });
      } else {
        res
          .status(200)
          .send({ message: "curso actualizado correctamente", status: 200 });
      }
    }
  });
}

function deleteCourse(req, res) {
  const { id } = req.params;
  console.log(req.params);
  Course.findByIdAndRemove({ _id: id }, (err, courseDeleted) => {
    if (err) {
      res.status(500).send({ message: "error en el servidor", status: 500 });
    } else {
      if (!courseDeleted) {
        res
          .status(404)
          .send({ message: "no se ha encontrado el curso", status: 404 });
      } else {
        res
          .status(200)
          .send({ message: "curso eliminado correctamente", status: 200 });
      }
    }
  });
}

module.exports = {
  addCourse,
  getCourses,
  updateCourses,
  deleteCourse,
};
