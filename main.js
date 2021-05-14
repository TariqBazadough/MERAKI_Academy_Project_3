const express = require("express");
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
  const id = req.params.id;
  let i;
  const found = articles.find((element, index) => {
    i = index;
    return (element.id = id);
  });
  if (found) {
    res.json(articles[i]);
    res.status(200);
  }
};

app.get("/articles", getAllArticles);
app.get("/articles/:id", getAnArticleById);

app.listen(port, () => {
  console.log(`Server is working on Port : ${port}`);
});
