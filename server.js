const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helment = require("helmet");
const routers = require("./routes");

// parse env variables
require('dotenv').config();
require("./helpers/db/mongodb.js")();

const app = express();

app.use(helment());

// import Routes
// const api = require("./routes/api");

//Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use("/api", routers);
app.get("*", (req, res) => {
  res.end(`Server is up and running on port ${port}`);
});

//Catch 404
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handle
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;
  //response to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  //reponse to server
  console.log(err);
});

//start server
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Server is running on port ${port}`));
