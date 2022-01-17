const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const utaskRoutes = require("./routes/tasks");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;
app.use(bodyParser.json());
app.use(morgan("tiny"));
// mongodb+srv://eShop:sagarboss@cluster0.ll54x.mongodb.net/todoListDb?retryWrites=true&w=majority
app.get((req, res) => {
  return res.status(200).json({
    message: "hello!",
  });
});

app.use(`${api}/task`, utaskRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "myEshop-Database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//Server
app.listen(4000, () => {
  console.log("server is running http://localhost:4000");
});
