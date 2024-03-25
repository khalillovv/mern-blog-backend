import mongoose from "mongoose";

const URI =
  "mongodb+srv://admin:l7lab3DLjTS3Wje1@cluster0.et4khhd.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
