const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const commentSchema = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
});

const User = mongoose.model("User", usersSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Article = mongoose.model("Article", articlesSchema);

module.exports.User = User;
module.exports.Comment = Comment;
module.exports.Article = Article;
