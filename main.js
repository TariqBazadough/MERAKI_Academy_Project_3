const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

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
    res.status(200);
    res.json(articles[i]);
  }
};

const getArticlesByAuthor = (req, res) => {
  const author = req.query.author;
  console.log(author);
  const filterByAuthor = articles.filter((element) => {
    return element.author === author;
  });
  res.status(200);
  res.json(filterByAuthor);
};

const createNewArticle = (req, res) => {
  const newArticle = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    id: uuidv4(),
  };
  articles.push(newArticle);
  res.status(201);
  res.json(newArticle);
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

app.get("/articles", getAllArticles);
app.post("/articles", createNewArticle);
app.get("/articles/search_2", getAnArticleById);
app.get("/articles/search_1", getArticlesByAuthor);
app.put("/articles/:id", updateAnArticleById);

app.listen(port, () => {
  console.log(`Server is working on Port : ${port}`);
});
