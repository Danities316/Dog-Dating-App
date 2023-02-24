const express = require("express");
const { isAuthenticated } = require("../auth");
const router = express.Router();
const users = require('./users')(isAuthenticated);

module.exports = isAuthenticated => {
    router.use('/users', users)
      return router;
} 