const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB_URI;

const option = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(DB, option).then(
  () => {
    console.log(DB);
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);
