const uuid = require("uuid");
const path = require("path");
const { Post, PostsOnTheWall , CommentsBelowThePost } = require("../models/models");

const ApiError = require("../error/ApiError");

class PostController {
  async create(req, res, next) {
    try {
      const { data, senderId, wallId } = req.body;

      //   const { img } = req.files;
      //   let fileName = uuid.v4() + ".jpg";
      //   img.mv(path.resolve(__dirname, "..", "static", fileName));
      //   if (coments) {
      //     coments = JSON.parse(coments);
      //     coments.forEach((i) =>
      //       PostsOnTheWall.create({
      //         data: i.data,
      //         likes: i.likes,
      //         disLikes: i.disLikes,
      //         sender: i.sender,
      //       })
      //     );
      //   }

      const post = await Post.create({
        data,
      });

      const postsOnTheWall = await PostsOnTheWall.create({
        senderId,
        wallId,
        postId: post.id,
      });
      const finalRes = {
        post: {
          ...post.toJSON(),
        },
        postsOnTheWall: {
          ...postsOnTheWall.toJSON(),
        },
      };

      return res.json(finalRes);
    } catch (e) {
      next(ApiError.badRequest(e.message));
      console.log(e);
    }
  }
  
  async  getOne(req, res) {
    try {
      const { id } = req.params;
      const post = await Post.findOne({
        where: { id },
        include: [{ model: CommentsBelowThePost, as: "commentsBelowThePost" }],
      });
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>",post);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      return res.json(post);
    } catch (error) {
      console.error("Error retrieving item:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  


  //   async getAll(req, res, next) {
  //     let { brandId, typeId, limit, page } = req.query;
  //     page = Number(page) || 1;
  //     limit = Number(limit) || 9999999;

  //     let offset = page * limit - limit;
  //     let item;
  //     if (!brandId && !typeId) {
  //       item = await Item.findAndCountAll({
  //         offset,
  //         limit,
  //         include: [{ model: ItemInfo, as: "info" }],
  //       });
  //     }
  //     if (brandId && !typeId) {
  //       item = await Item.findAndCountAll({
  //         where: { brandId },
  //         limit,
  //         offset,
  //         include: [{ model: ItemInfo, as: "info" }],
  //       });
  //     }
  //     if (!brandId && typeId) {
  //       item = await Item.findAndCountAll({
  //         where: { typeId },
  //         limit,
  //         offset,
  //         include: [{ model: ItemInfo, as: "info" }],
  //       });
  //     }
  //     if (brandId && typeId) {
  //       item = await Item.findAndCountAll({
  //         where: { typeId, brandId },
  //         limit,
  //         offset,
  //         include: [{ model: ItemInfo, as: "info" }],
  //       });
  //     }
  //     res.json(item);
  //     return next();
  //   }
  //   async getOne(req, res) {
  //     const { id } = req.params;
  //     const item = await Item.findOne({
  //       where: { id },
  //       include: [{ model: ItemInfo, as: "info" }],
  //     });
  //     return res.json(item);
  //   }
}

module.exports = new PostController();
