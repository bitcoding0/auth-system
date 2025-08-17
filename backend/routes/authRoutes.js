
const express = require("express");
const { signup, login, getUser, deleteUser, SendLink, resetPassword, updatePassword } = require("../controllers/authController");
const { authentication } = require("../middleware/middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user/:id", authentication, getUser);

router.post("/forgot-password", SendLink);
router.put("/reset-Password", resetPassword);
router.post("/update-password", authentication, updatePassword);
router.delete("/delete-account", authentication, deleteUser);


module.exports = router