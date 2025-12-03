const express = require("express");
const router = express.Router();
const { signup, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/signup", signup);

module.exports = router;
