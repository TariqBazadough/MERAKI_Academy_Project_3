const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 5;

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.ObjectId , ref: "Role"},
});

const roleSchema = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String }],
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

usersSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", usersSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Article = mongoose.model("Article", articlesSchema);
const Role = mongoose.model("Role", roleSchema);

module.exports.User = User;
module.exports.Comment = Comment;
module.exports.Article = Article;
module.exports.Role = Role;
