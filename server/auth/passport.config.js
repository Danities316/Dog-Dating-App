const User = require('../models/users');
const bcrypt = require('bcrypt');
const { async } = require('regenerator-runtime');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt");
const ExtractJwt  = require("passport-jwt").ExtractJwt

module.exports = (passport) => {
   passport.use('local-signup',
    new LocalStrategy({
        usernameField: "email",
        passwordField: "hashedPassword"
    },
    async (email, password, done) => {
        try {
            // check if user exists
            const userExists = await User.findOne({"email": email});
            if(userExists){
                return done(null, false);
            };
            // Create a new user with the data Provided
            const user = await user.create({ email, password});
            return done(null, user)

        } catch (error) {
            done(error)
        }
    }));

   passport.use('local-login', 
   new LocalStrategy({
    usernameField: "email",
    passwordField: "hashedPassword"
   },
   async (email, password, done) => {
        try {
            const user = await User.findOne({email});
            if(!user) return done(null, false);
            const isMatch = await user.matchPassword(password);
            if(!isMatch) return done(null, false);
            //password match return user
            console.log('password matched.'); 
            return done(null, user)
        } catch (error) {
            console.log(error);
            return done(error, false)
        }
   }
   ));
   
   passport.use({
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "secretKey"
   },
   async (jwtPayload, done) => {
    try {
        //Extract user
        const user = jwtPayload.user;
        done(null, user);
    } catch (error) {
        done(error, false)
    }
   });

    //---------------------Storing your hashed password to the db in your browser cookie---------------------
    passport.serializeUser((user, cb) => {
      // process.nextTick(() => {
      //   console.log("serielized", user._id)
      //   return cb(null, {
      //     email: user.email,
      //     username: user.username,
      //   });
      // });
        console.log("serielized", user._id)
        return cb(null, {email: user.email,username: user.username });

    });

        //--------------------- Retrieving stored hashed password from the db in your browser cookie---------------------
  passport.deserializeUser((user, cb) => {
    // process.nextTick( () => {
    //   return cb(null, user);
    // });
    return done(null, user);
  });

};
        
//         (email, password) => {
//         User.findOne({email}, (err, user) => {
//             console.log(user)
//             if(err) throw err;
//             if(!user) return done(null, false);
//             bcrypt.compare(password, user.password, (err, result) => {
//                 if(err) throw err;
//                 if(result === true){
//                     return done(null, user);
//                 }else{
//                     return done(null, false);
//                 }
            
//             });
//         })
//     })
//    )
  
 
 
