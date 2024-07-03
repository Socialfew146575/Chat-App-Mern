const { Router } = require("express");
const { register, login, setAvatar } = require("../controllers/auth");

const router = Router(); // Invoke the Router function to create an instance

router.post("/register", register);
router.post("/login", login);
router.patch("/setAvatar/:id", setAvatar);

module.exports = router;
