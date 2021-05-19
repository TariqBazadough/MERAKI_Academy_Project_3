const express = require("express");
const db = require("./db");
const { User, Article, Comment } = require("./schema");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { v4: uuidv4 } = require("uuid");
// const { json } = require("express");

const port = 5000;
const SECRET = process.env.SECRET;
const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time;

app.use(express.json());

// const articles = [
//   {
//     id: 1,
//     title: "How I learn coding?",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
//   {
//     id: 2,
//     title: "Coding Best Practices",
//     description: "Lorem, ipsum dolor sit, Quam, mollitia.",
//     author: "Besslan",
//   },
//   {
//     id: 3,
//     title: "Debugging",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
// ];

const getAllArticles = (req, res) => {
  Article.find({})
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getAnArticleById = (req, res) => {
  const id = req.query.id;
  Article.find({ _id: id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getArticlesByAuthor = (req, res) => {
  const id = req.query.id;
  Article.find({ author: id })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const createNewArticle = (req, res) => {
  const { title, description, author } = req.body;
  const article = new Article({ title, description, author });

  article
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const updateAnArticleById = (req, res) => {
  const id = req.params.id;
  const { title, description, author } = req.body;
  Article.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  Article.findByIdAndRemove({ _id: id })
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: `success delete article with Id : ${id}`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteArticlesByAuthor = (req, res) => {
  const id = req.body.author;
  Article.deleteMany({ author: id })
    .then((result) => {
      res.status(200);
      res.json({
        success: true,
        message: `Success delete all the articles for the author => ${id}`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

const createNewAuthor = (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const user = new User({ firstName, lastName, age, country, email, password });
  user
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((result) => {
      bcrypt.compare(password, result.password, (err, match_result) => {
        if (match_result) {
          const payload = {
            userId: match_result._id,
            country: match_result.country,
            secret: SECRET,
          };

          const options = {
            expiresIn: TOKEN_EXP_Time,
          };

          res.status(200);
          const token = jwt.sign(payload, SECRET, options);
          res.json({ token: `${token}` });
        } else {
          res.status(403);
          res.json({
            message: "The password you’ve entered is incorrect",
            status: 403,
          });
        }
      });
    })
    .catch((err) => {
      res.status(404);
      res.json({ message: "The email doesn't exist", status: 404 });
    });
};

const createNewComment = (req, res) => {
  const article_id = req.params.id;
  const { comment, commenter } = req.body;
  const newComment = new Comment({ comment, commenter });
  newComment
    .save()
    .then((result) => {
      Article.findOneAndUpdate(
        { _id: article_id },
        { $push: { comments: result._id } },
        { new: true }
      )
        .then((result_article) => {
          console.log(result_article);
        })
        .catch((err) => {
          res.json(err);
        });

      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

app.get("/articles", getAllArticles);
app.post("/articles", createNewArticle);
app.get("/articles/search_2", getAnArticleById);
app.get("/articles/search_1", getArticlesByAuthor);
app.put("/articles/:id", updateAnArticleById);
app.delete("/articles/:id", deleteArticleById);
app.delete("/articles", deleteArticlesByAuthor);
app.post("/users", createNewAuthor);
app.post("/login", login);
app.post("/articles/:id/comments", createNewComment);

app.listen(port, () => {
  console.log(`Server is working on Port : ${port}`);
});
