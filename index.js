const express = require("express");

const app = express();

app.post("/game", (req, res) => {
  // requires boardSize & mineCount
  // returns board (nested array of block statuses)
  // returns gameStatus = ongoing
  res.send({ message: "you are asking for a new game" });
});

app.post("/click", (req, res) => {
  // requires x,y
  // requires click or flag (default to click)
  // returns grid
  // returns gameStatus = ongoing, lost, won
  res.send({ message: "you make a click!" });
});

app.get("/game", (req, res) => {
  // returns grid
  // returns gameStatus = ongoing, lost, won
  res.send({ message: "gametime" });
});

app.listen(8080);
