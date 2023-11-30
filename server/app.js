const express = require("express");
const cors = require("cors");

const { createUser } = require("./controllers/user.controller");
const { getAllMessage } = require("./controllers/message.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", getAllMessage);

app.post("/users", createUser);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ errors: [err] });
});

module.exports = app;
