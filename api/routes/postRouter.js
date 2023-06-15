const Router = require("express");
const router = new Router();
const postController = require("../controllers/postController");

router.post("/", postController.create);
// router.get("/", postController.getAll);
// router.get("/:id", itemController.getOne);

module.exports = router;
