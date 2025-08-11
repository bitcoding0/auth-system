
const express = require("express");
const { signup, login, getUser, deleteUser } = require("../controllers/authController");
const { authentication } = require("../middleware/middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user/:id", authentication, getUser);
router.delete("/user-delete/:id", authentication, deleteUser);


module.exports = router