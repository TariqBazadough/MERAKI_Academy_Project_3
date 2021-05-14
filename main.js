const express = require("express");
const app = express();

const port = 5000;

app.listen(() => {
  console.log(`Server is working on Port : ${port}`);
});
