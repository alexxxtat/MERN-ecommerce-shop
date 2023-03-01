const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("listening a request about auth");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("Connected auth route...");
});

router.post("/register", async (req, res) => {
  //make sure the data is validate to be saved
  let { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //make sure the data is not registered yet
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("This email has been registered.");
  //make a new user and save to database
  let { email, username, password, role } = req.body;
  let newUser = new User({ email, username, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "User saved successfully",
      savedUser: savedUser,
    });
  } catch (e) {
    return res.status(500).send("cannot be saved the user");
  }
});

router.post("/login", async (req, res) => {
  //check the formate only
  let { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("User not found");
  }
  foundUser.comparedPassword(req.body.password, (err, isMatch) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (isMatch) {
      //make jwt
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "login success",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("Wrong Password");
    }
  });
});
module.exports = router;
