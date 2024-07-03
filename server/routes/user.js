const { Router } = require("express");
const { getAllUsers } = require("../controllers/user");

const router = Router(); // Invoke the Router function to create an instance

router.get("/allUsers/:id", getAllUsers);

module.exports = router;
