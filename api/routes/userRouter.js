const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", userController.registration);
router.post("/login", userController.login);

// router.post('/logout', userController.logout);

//для активации  акаунта по ссылке которая будет приходить по почте
// router.get('/activate/:link', userController.activate);

//перезапись access токена если он умер
// router.get('/refresh', userController.refresh);

//  список всех юзеров
// router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;
