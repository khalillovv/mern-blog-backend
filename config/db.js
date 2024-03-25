import mongoose from "mongoose";
// import { DB_PASSWORD } from "./secret.js";
// const password = DB_PASSWORD;

// const URI = `mongodb+srv://admin:${password}@cluster0.et4khhd.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
