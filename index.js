const express = require("express");
const bodyParser = require("body-parser");
const {
  postGameHandler,
  postClickHandler,
  getGameHandler
} = require("./routeHandlers");

const app = express();
app.use(bodyParser.json());

// GLOBAL VARIABLE
CURRENT_GAME = {
  board: [],
  status: "this is the status"
};

app.post("/game", (req, res) => {
  const { boardSize, mineCount } = req.body;
  postGameHandler(boardSize, mineCount);
  res.send({ game: CURRENT_GAME });
});

app.post("/click", (req, res) => {
  // requires x,y
  // requires click or flag (default to click)
  // returns grid
  // returns gameStatus = ongoing, lost, won
  const { x, y, action } = req.body;
  const game = postClickHandler(x, y, action);
  res.send({ game: CURRENT_GAME });
});

app.get("/game", (req, res) => {
  // const { game } = getGameHandler();
  res.send({ game: CURRENT_GAME });
});

app.listen(8080);
