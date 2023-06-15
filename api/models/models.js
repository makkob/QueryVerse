const sequelize = require("../db");
// Класс с помощу которого описываются типы того или инного поня
const { DataTypes, TEXT } = require("sequelize");
// Описываем модель пользователя
const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  secondName: { type: DataTypes.STRING },
  dateOfBirthsday: { type: DataTypes.DATEONLY },
  likes: { type: DataTypes.TINYINT, defaultValue: 0 },
  disLikes: { type: DataTypes.TINYINT, defaultValue: 0 },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Wall = sequelize.define("wall", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const PostsOnTheWall = sequelize.define("postsOnTheWall", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  sender: { type: DataTypes.INTEGER },
});

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data: { type: DataTypes.STRING, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  disLikes: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const CommentsBelowThePost = sequelize.define("commentsBelowThePost", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

User.hasOne(Wall);
Wall.belongsTo(User);

Wall.hasMany(PostsOnTheWall);
PostsOnTheWall.belongsTo(Wall);

Post.hasMany(PostsOnTheWall);
PostsOnTheWall.belongsTo(Post);

Post.hasMany(CommentsBelowThePost, { as: "commentsBelowThePost" });
CommentsBelowThePost.belongsTo(Post);

module.exports = {
  User,
  Wall,
  PostsOnTheWall,
  Post,
  CommentsBelowThePost,
};
