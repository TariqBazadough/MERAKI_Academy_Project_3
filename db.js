const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

const option = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(DB_URI, option).then(
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);
