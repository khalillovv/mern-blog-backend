import postModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await postModel.find().limit(5).exec();

    const tags = posts.map((obj) => obj.tags).flat();
    // .slice(0, 5); // ограничение по количеству
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: ["fullName", "avatarUrl"] })
      .exec();
    // const posts = await postModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getPopularPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .sort({ viewsCount: -1 })
      .populate({ path: "user", select: ["fullName", "avatarUrl"] })
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel
      .findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          new: true,
        }
      )
      .populate({ path: "user", select: ["fullName", "avatarUrl"] });

    if (!post) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await postModel.findOneAndDelete({
      _id: postId,
    });

    if (!post) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const create = async (req, res) => {
  let tags = [];
  if (req.body.tags) {
    tags = req.body.tags.split(".");
  }

  try {
    const doc = new postModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const update = async (req, res) => {
  let tags = [];
  if (req.body.tags) {
    tags = req.body.tags.split(".");
  }
  try {
    const postId = req.params.id;

    const post = await postModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: tags,
      }
    );

    if (!post) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
