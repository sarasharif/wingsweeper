const express = require("express");
const bodyParser = require("body-parser");
const { postGameHandler, postClickHandler } = require("./routeHandlers");

const app = express();
app.use(bodyParser.json());

// GLOBAL VARIABLES
CURRENT_GAME = {
  board: null,
  status: null
};

app.post("/game", postGameHandler);

app.post("/click", postClickHandler);

app.get("/game", (_, res) => {
  res.send({ game: CURRENT_GAME });
});

app.listen(8080);
