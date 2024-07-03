const { Router } = require("express");
const { getAllMessage,addMessage } = require("../controllers/message");

const router = Router(); // Invoke the Router function to create an instance

router.get("/getMessage/:from/:to", getAllMessage);
router.post("/addMessage", addMessage);

module.exports = router;
