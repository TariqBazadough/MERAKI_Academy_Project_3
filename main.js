const { Console } = require("console");
const express = require("express");
const { CLIENT_RENEG_LIMIT } = require("tls");
const app = express();

const port = 5000;

app.use(express.json());

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

const getAllArticles = (req, res) => {
  res.status(200);
  res.json(articles);
};

const getAnArticleById = (req, res) => {
  const id = req.query.id;

  let i;
  const found = articles.find((element, index) => {
    i = index;
    return element.id == id;
  });
  if (found) {
    res.json(articles[i]);
    res.status(200);
  }
};

const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;
  console.log(author);
  const filterByAuthor = articles.filter((element) => {
    return element.author === author;
  });

  res.json(filterByAuthor);
  res.status(200);
};

app.get("/articles", getAllArticles);
app.get("/articles/search_2", getAnArticleById);
app.get("/articles/search_1", getArticlesByAuthor);

app.listen(port, () => {
  console.log(`Server is working on Port : ${port}`);
});
