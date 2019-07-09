const express = require("express");
const bodyParser = require("body-parser");
const { postGameHandler, postClickHandler } = require("./routeHandlers");

const app = express();
app.use(bodyParser.json());

// GLOBAL VARIABLES
GAME_STATUS = {
  LOST: "lost",
  WON: "won",
  IN_PLAY: "inPlay"
};

BOX_STATUS = {
  CLOSED: "closed",
  OPEN: "open",
  FLAGGED: "flagged"
};

CURRENT_GAME = {
  board: [],
  status: GAME_STATUS.IN_PLAY
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
  const { x, y, action } = req.body;
  try {
    postClickHandler(x, y, action);
  } catch (err) {
    res.send({ error: err.message });
  }
  res.send({ game: CURRENT_GAME });
});

app.get("/game", (req, res) => {
  res.send({ game: CURRENT_GAME });
});

app.listen(8080);
