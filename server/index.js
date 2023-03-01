const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
//Router
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport); //function cal be called directly by using()

//Connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mernDB")
  .then(() => {
    console.log("Connected to mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Router middlewares:
app.use("/api/user", authRoute);
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
); //course route should be protected by jwt (if request header does not have jwt or fake jwt, request unauthorized)

//Only User who have logged  in(have jwt) can create or register a course
//port 3000 is react and 27017 is mongodb
app.listen(8080, () => {
  console.log("Server is listening the port 8080...");
});
