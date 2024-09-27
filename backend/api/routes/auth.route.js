const express =  require("express");
const { login, register, revalidate } = require("../controllers/auth.controller");

const router = express.Router();

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/checkValidate").post(revalidate);



module.exports = router;