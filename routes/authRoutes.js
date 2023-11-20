const express = require("express")
const authController = require("../controller/AuthController")
const router  = express.Router()


router.post("/signup",authController.signUp);
router.post("/signin",authController.signIn)
module.exports = router;
