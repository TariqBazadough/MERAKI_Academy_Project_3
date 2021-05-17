const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const User = mongoose.model("User", usersSchema);
const Article = mongoose.model("Article", articlesSchema);
module.exports.User = User;
module.exports.Article = Article;
