const express = require("express");
const bodyParser = require("body-parser");
const {
  postGameHandler,
  postClickHandler,
  getGameHandler
} = require("./routeHandlers");

const app = express();
app.use(bodyParser.json());

app.post("/game", (req, res) => {
  // requires boardSize & mineCount
  // returns board (nested array of block statuses)
  // returns gameStatus = ongoing
  const { boardSize, mineCount } = req.body;
  const game = postGameHandler(boardSize, mineCount);
  res.send({ game });
});

app.post("/click", (req, res) => {
  // requires x,y
  // requires click or flag (default to click)
  // returns grid
  // returns gameStatus = ongoing, lost, won
  const { x, y, action } = req.body;
  const game = postClickHandler(x, y, action);
  res.send({ game });
});

app.get("/game", (req, res) => {
  // returns grid
  // returns gameStatus = ongoing, lost, won
  const game = getGameHandler();
  res.send({ game });
});

app.listen(8080);
