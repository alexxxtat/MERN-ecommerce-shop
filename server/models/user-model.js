const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//instance methods
userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

userSchema.methods.comparedPassword = async function (password, cb) {
  //password is the user type in pw and this.pw is the data stored in the mongodb
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
  // let result = await bcrypt.compare(password, this.password);
  // return cb(null, result);
};
//mongoose middlewares
//if is new user or changing the pw => hash the pw and save to mongosedb
// !!using arrow function, keyword this is not representing the mongoDB's Document
userSchema.pre("save", async function (next) {
  //this represent mongoDB's Document
  if (this.isNew || this.isModified("password")) {
    //hash the pw
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
