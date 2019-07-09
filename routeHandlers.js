const { createNewGame, clickBox, getCurrentGame } = require("./helpers");

const postGameHandler = (boardSize, mineCount) => {
  if (boardSize ** 2 <= mineCount) {
    throw new Error("You must have fewer mines than boxes!");
  }
  createNewGame(boardSize, mineCount);
};

const postClickHandler = (x, y, action) => {
  const n = CURRENT_GAME.board.length;
  if (x < 0 || y < 0 || x >= n || y >= n) {
    throw new Error("Those are not valid coordinates");
  }
  clickBox(x, y, action);
};

module.exports = {
  postGameHandler,
  postClickHandler
};
