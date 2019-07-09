const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/game", (req, res) => {
  // requires boardSize & mineCount
  // returns board (nested array of block statuses)
  // returns gameStatus = ongoing
  console.log(req.body.boardSize);
  console.log(req.body.mineCount);
  res.send({ message: `you are asking for a new game` });
});

app.post("/click", (req, res) => {
  // requires x,y
  // requires click or flag (default to click)
  // returns grid
  // returns gameStatus = ongoing, lost, won
  console.log(req.body.x);
  console.log(req.body.y);
  res.send({ message: "you make a click!" });
});

app.get("/game", (req, res) => {
  // returns grid
  // returns gameStatus = ongoing, lost, won
  res.send({ message: "gametime" });
});

app.listen(8080);
