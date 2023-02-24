const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");
const composable_middleware = require("composable-middleware");

const SECRET = "town-hall-bulabulu";

const sign = (user) => {
   return jwt.sign({
        _id: user._id,
    }, SECRET, {
        expiresIn: 60 * 60
    });
};

const sendUnauthorized = (req, res) => {
    console.log(req.headers.authorization);
    console.log(req.user);
    res.status(401).json({ Msg: "Unauthorized" });
  };

  const validateJwt = expressJwt({
    secret: SECRET,
    algorithms: ["HS256"],
    fail: sendUnauthorized,
    getToken(req) {
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer'){
            return req.headers.authorization.split(' ')[1];
        }else if(req.query && req.query.access_token){
            return req.query.access_token
        }
        return null;
    }
  });

  const isAuthenticated = (User) => {
    console.log('isAuthenticated is called');
    return composable_middleware()
        .use(validateJwt)
        .use((req, res, next) => {
            // Attach user to request
            // const { _id } = req.user;
            User.findById('63e29490487f7dc4ed495606', '-hashedPassword -salt', function(err, user) {
                console.log(user)
                if (err) return next(err);
                if (!user) return sendUnauthorized(req, res);
                req.user = user;
                console.log('Successfully verified user by token: ', user.email);
                next();
            });
        });
};


module.exports = {
    sign,
    sendUnauthorized,
    isAuthenticated
}