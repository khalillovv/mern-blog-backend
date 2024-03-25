import express from "express";
import multer from "multer";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import "./config/db.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { userController, postController } from "./controllers/index.js";

const app = express();
// const port = 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, limits: { fileSize: 1000000 } });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  userController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  userController.register
);
app.get("/auth/me", checkAuth, userController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", postController.getLastTags);
app.get("/posts/tag/:tag", postController.getPostsByTag);

app.get("/posts", postController.getAll);
app.get("/popular-posts", postController.getPopularPosts);
app.get("/posts/tags", postController.getLastTags);
app.get("/posts/:id", postController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  postController.create
);
app.patch(
  "/posts/:id",
  checkAuth,
  handleValidationErrors,
  postController.update
);
app.delete("/posts/:id", checkAuth, postController.remove);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server listening on port ${PORT}`);
});
