const mongoose = require("mongoose");
const crypto = require("crypto");
const { async } = require("regenerator-runtime");
const bcrypt = require("bcrypt");

const DogSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Users'
},
  DogDateOfBirth: {
    type: Date,
    // required: [true, "Please add Your Date of Birth"],
  },
  DogType: {
    type: String,
    // required: [true, "Please add Dog Type"],
  },
  DogDescrition: {
    type: String,
    // required: [true, "Please add Description"],
  },
  DogBread: {
    type: String,
    // required: [true, "Please add DogBread"],
  },
  Sex: {
    type: String,
    enum: ["male", "female"],
    // required: [true, "Please add name"],
  },
  photo: {
    type: String,
  },
  petname: {
    type: String,
    // required: [true, "Please add Username"],
  }
});



const Dogs = mongoose.model("Dogs", DogSchema);
//---------------------------- End of Mongoose-----------------------

module.exports = Dogs;
// db => db.model('User', DogSchema);
