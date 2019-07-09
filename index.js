const express = require("express");
const bodyParser = require("body-parser");
const {
  postGameHandler,
  postClickHandler,
  getGameHandler
} = require("./routeHandlers");

const app = express();
app.use(bodyParser.json());

// GLOBAL VARIABLES
CURRENT_GAME = {
  board: [],
  status: "this is the status"
};

BOX_STATUS = {
  CLOSED: "closed",
  OPEN: "open",
  FLAGGED: "flagged"
};

app.post("/game", (req, res) => {
  const { boardSize, mineCount } = req.body;

  try {
    postGameHandler(boardSize, mineCount);
  } catch (err) {
    res.send({ error: err.message });
  }

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
