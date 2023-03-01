const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("course route is getting a reqeust");
  next();
});

//get all the courses from db
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    res.status(500).send(e);
  }
});
//get course by instructor's id
router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;
  let coursesFound = await Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .exec();
  return res.send(coursesFound);
});

// get course by student's id
router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  let coursesFound = await Course.find({ students: _student_id })
    .populate("instructor", ["username", "email"])
    .exec();
  return res.send(coursesFound);
});
//search for course using course id
router.get("/:_id", async (req, res) => {
  // console.log(req.params);
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});
//search for course using course name
router.get("/findByName/:name", async (req, res) => {
  // console.log(req.params);
  let { name } = req.params;
  try {
    let courseFound = await Course.find({ title: name })
      .populate("instructor", ["email", "username"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//Create a course
router.post("/", async (req, res) => {
  //check the data is validate
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (req.user.isStudent()) {
    return res.status(400).send("Only instructor can add new course");
  }
  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send({ msg: "Created new course success", savedCourse });
  } catch (e) {
    return res.status(500).send("Cannnot create new course");
  }
});

//Edit course info
router.patch("/:_id", async (req, res) => {
  //validate the course info
  let { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { _id } = req.params;
  try {
    //course Need to be exist first
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).sned("cannot found course info, cannot be edit");
    }
    //need to be editing course's instructor
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({ msg: "Updated", updatedCourse });
    } else {
      return res
        .status(403)
        .send("Only course's instructor can be edited the course");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});
//student enrollemnt by id

router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).exec();
    course.students.push(req.user._id);
    await course.save();
    return res.send("註冊完成");
  } catch (e) {
    return res.send(e);
  }
});
//delete course
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    //course Need to be exist first
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(400).sned("cannot found course info, cannot be delete");
    }
    //need to be delete course's instructor
    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.send("Delected ");
    } else {
      return res
        .status(403)
        .send("Only course's instructor can be delete the course");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});
module.exports = router;
