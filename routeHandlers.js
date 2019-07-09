const { createNewGame, clickBox, getCurrentGame } = require("./helpers");

const postGameHandler = (boardSize, mineCount) => {
  if (boardSize ** 2 <= mineCount) {
    throw new Error("You must have fewer mines than boxes!");
  }
  createNewGame(boardSize, mineCount);
};

const postClickHandler = (x, y, action) => {
  // access CURRENT_GAME
  // validate coordinates on closed box
  // generate new board
  // return CURRENT GAME
  return { message: `running postClickHandler with ${x}, ${y}, ${action}` };
};

const getGameHandler = () => ({ game: getCurrentGame() });

module.exports = {
  postGameHandler,
  postClickHandler,
  getGameHandler
};
