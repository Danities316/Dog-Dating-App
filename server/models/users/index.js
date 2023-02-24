const mongoose = require("mongoose");
const crypto = require("crypto");
const { async } = require("regenerator-runtime");
// const { Schema } = mongoose.Schema();
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "Please add First Name"],
  },
  LastName: {
    type: String,
    // required: [true, "Please add Lasr Name"],
  },
  DateOfBirth: {
    type: Date,
    // required: [true, "Please add Your Date of Birth"],
  },
  address: {
    type: String,
    // required: [true, "Please add Address"],
  },
  State: {
    type: String,
    // required: [true, "Please add State"],
  },
  LGA: {
    type: String,
    // required: [true, "Please add LGA"],
  },
  PhoneNumber: {
    type: String,
    // required: true,
    min: [11, "Number must be 11 numbers"],
    max: [11, "Number must be  11 numbers"],
  },
  Descrition: {
    type: String,
    // required: [true, "Please add Description"],
  },
  Sex: {
    type: String,
    enum: ["male", "female"],
    // required: [true, "Please add name"],
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please add Username"],
  },
  password: {
    type: String,
    required: [true, "Please add Password"],
  },
  salt: String,
});

UserSchema.pre("save", async function (next) {
  try {
    //check method of registration
    const user = this;
    if (!user.isModified("hashPassword")) next();
    //generate salt
    const salt = await bcrypt.genSalt(10);

    //hash the password
    const hashPassword = await bcrypt.hash(this.hashPassword, salt);
    //replace plain text password with hashed password
    this.hashPassword = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

//   UserSchema.method = {
//      makeSalt: function() {
//         return crypto.randomBytes(16).toString('base64');
//     },

//     authenticate: ((plainText) => {
//         return this.encryptPassword(plainText) == this.hashPassword;
//     }),

//     encryptPassword : ((password) => {
//         if(!password || !this.salt) return '';
//         var salt = new Buffer(this.salt, 'base64');
//         return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sh512').toString('base64')
//     })

//   }
UserSchema.methods.matchPassword = async (password) => {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("Users", UserSchema);
//---------------------------- End of Mongoose-----------------------

module.exports = User;
// db => db.model('User', UserSchema);
