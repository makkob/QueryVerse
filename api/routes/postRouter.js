const Router = require("express");
const router = new Router();
// const postController = require("../controllers/postController");

const checkRole = require("../middleware/checkRoleMiddleware");

// router.post("/", postController.create);
// router.get("/", postController.getAll);
// router.get("/:id", itemController.getOne);

module.exports = router;
