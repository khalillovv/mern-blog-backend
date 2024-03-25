import mongoose from "mongoose";

// const URI = `mongodb+srv://admin:${password}@cluster0.et4khhd.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
