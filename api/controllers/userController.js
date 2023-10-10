const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Wall } = require("../models/models");
const uuid = require("uuid");
const mailservice = require ("../service/mail-service")

const generateJwt = (wallId, id, email) => {
  return jwt.sign(
    {
      wallId,
      id,
      email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

class UserController {
  constructor() {}
  async registration(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Некоректні данні"));
    }

    // Проверка на такой же email
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.badRequest("Користувач з таким email вже існує"));
    }
    // Хешируем пароль
    const hashPassword = await bcrypt.hash(password, 5);

    const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
    // Создаем пользователя
    const user = await User.create({
      email,
      password: hashPassword,
      role: "USER",
    });

    await mailservice.sendActivationMail(email ,activationLink );

    // Создаем для пользователя корзину
    await Wall.create({ userId: user.id });
    const wallID = await Wall.findOne({
      where: {
        userId: user.id,
      },
    });
    const token = generateJwt(wallID.id, user.id, user.email);
    
    return res.json({ token });
  }
  
  async login(req, res, next) {
    try {
      const { identifier, password } = req.body;
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: identifier }, { phone: identifier }],
        },
      });
      
      if (!user) {
        return next(ApiError.internal("Такого користувача не існує =("));
      }
      
      // Сравниваем пароли
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal("Не вірний пароль =("));
      }
      
      const wall = await Wall.findOne({
        where: {
          userId: user.id,
        },
      });
      
  
      const token = generateJwt(wall.id, user.id, user.email);
      return res.json({ token });
    } catch (error) {
      // Обработка ошибок
      return next(error); // Передаем ошибку в следующий middleware
    }
  }
  

  //   async check(req, res, next) {
  //     const basketID = await Basket.findOne({
  //       where: {
  //         userId: req.user.id,
  //       },
  //     });
  //     const token = generateJwt(
  //       basketID.id,
  //       req.user.id,
  //       req.user.email,
  //       req.user.role,
  //       req.user.id,
  //       req.user.email,
  //       req.user.role,
  //       req.user.phone,
  //       req.user.firstName,
  //       req.user.secondName,
  //       req.user.dateOfBirthsday,
  //       req.user.discount,
  //       req.user.favouriteBeer
  //     );
  //     return res.json({ token });
  //     // res.json({ message: 'worcking' });
  //   }

  //   async editUserInfo(req, res, next) {
  //     const { phone, firstName, secondName, dateOfBirthsday, favouriteBeer } =
  //       req.body;
  //     const userId = req.params.userId; // or however you're passing in the user ID

  //     try {
  //       // Find the existing user
  //       const user = await User.findByPk(userId);
  //       if (!user) {
  //         return res.status(404).json({ message: "User not found" });
  //       }

  //       // Update the user's information
  //       user.phone = phone;
  //       user.firstName = firstName;
  //       user.secondName = secondName;
  //       user.dateOfBirthsday = dateOfBirthsday;
  //       user.favouriteBeer = favouriteBeer;

  //       // Save the updated user to the database
  //       await user.save();

  //       // Generate a new JWT with the updated user information
  //       const basketID = await Basket.findOne({
  //         where: {
  //           userId: user.id,
  //         },
  //       });
  //       const token = generateJwt(
  //         basketID.id,
  //         user.id,
  //         user.email,
  //         user.role,
  //         user.phone,
  //         user.firstName,
  //         user.secondName,
  //         user.dateOfBirthsday,
  //         user.discount,
  //         user.favouriteBeer
  //       );

  //       return res.json({ token });
  //     } catch (error) {
  //       return res
  //         .status(500)
  //         .json({ message: "Error updating user information" });
  //     }
  //   }
}
module.exports = new UserController();

// 31:10