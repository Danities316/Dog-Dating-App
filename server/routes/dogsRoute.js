const express = require("express");
const router = express.Router();
const {
  registerDog,
  getDog,
  deleteDog,
  updateDog,
} = require("../contollers/dogsContoller");
const { protect } = require('../middleware/authMiddleware')

router.get("/", protect, getDog)
router.post("/", protect, registerDog);
router.delete("/:id", protect,  deleteDog)
router.put("/:id", protect, updateDog);

module.exports = router;
