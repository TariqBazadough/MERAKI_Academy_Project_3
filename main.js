const express = require("express");
const db = require("./db");
const { User, Article } = require("./schema");
const app = express();
// const { v4: uuidv4 } = require("uuid");
// const { json } = require("express");

const port = 5000;

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
  const title = req.body.title;
  const description = req.body.description;
  const author = req.body.author;
  let i;
  const found = articles.find((element, index) => {
    i = index;
    return element.id == id;
  });
  if (title) {
    articles[i].title = title;
  }
  if (description) {
    articles[i].description = description;
  }
  if (author) {
    articles[i].author = author;
  }
  res.status(200);
  res.json(articles[i]);
};

const deleteArticleById = (req, res) => {
  const id = req.params.id;
  let i;
  const found = articles.find((element, index) => {
    i = index;
    return element.id == id;
  });
  articles.splice(i, 1);
  res.status(200);
  res.json({ success: true, massage: `Success Delete article with id ${id}` });
};

const deleteArticlesByAuthor = (req, res) => {
  const author = req.body.author;
  articles.forEach((element, index) => {
    if (element.author === author) {
      articles.splice(index, 1);
    }
  });
  res.status(200);
  res.json({
    success: true,
    massage: `Success delete all the articles for the author => ${author}`,
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

app.get("/articles", getAllArticles);
app.post("/articles", createNewArticle);
app.get("/articles/search_2", getAnArticleById);
app.get("/articles/search_1", getArticlesByAuthor);
app.put("/articles/:id", updateAnArticleById);
app.delete("/articles/:id", deleteArticleById);
app.delete("/articles", deleteArticlesByAuthor);
app.post("/users", createNewAuthor);

app.listen(port, () => {
  console.log(`Server is working on Port : ${port}`);
});
